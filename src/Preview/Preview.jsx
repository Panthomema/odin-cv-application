import { useEffect, useRef, useState } from 'react';
import styles from './Preview.module.css';
import { formatDateYearMonthText } from '../utils/functions';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export default function Preview({ resumeData }) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  const { personalDetails, professionalExperience } = resumeData;

  useEffect(() => {
    if (!containerRef.current) return;
    const containerDiv = containerRef.current;

    const updateScale = () => {
      if (containerDiv) {
        const containerRect = containerDiv.getBoundingClientRect();
        const newScale = containerRect.width / A4_WIDTH;
        setScale(newScale);

        // Adjust the container height (it would stay 1123px otherwise)
        containerDiv.style.height = `${A4_HEIGHT * newScale}px`;
      }
    };

    // Initial calculation
    updateScale();

    // Create ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    // Start observing
    resizeObserver.observe(containerDiv);

    // Clean up
    return () => {
      resizeObserver.unobserve(containerDiv);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.previewContainer} ref={containerRef}>
      <div className={styles.preview} style={{ transform: `scale(${scale})` }}>
        <div className={styles.personal}>
          <h1>{personalDetails.fullName}</h1>
          <ul className={styles.contact}>
            {personalDetails.email && (
              <li>
                <span className="material-symbols-outlined">mail</span>
                {personalDetails.email}
              </li>
            )}
            {personalDetails.phoneNumber && (
              <li>
                <span className="material-symbols-outlined">call</span>
                {personalDetails.phoneNumber}
              </li>
            )}
            {personalDetails.location && (
              <li>
                <span className="material-symbols-outlined">location_on</span>
                {personalDetails.location}
              </li>
            )}
          </ul>
        </div>
        <div className={styles.content}>
          {professionalExperience.length > 0 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Professional Experience</h2>
              {professionalExperience.map((item) => (
                <div key={item.id} className={styles.sectionItem}>
                  <div>
                    {item.startDate && (
                      <p>
                        {formatDateYearMonthText(new Date(item.startDate))} - {formatDateYearMonthText(new Date(item.endDate))}
                      </p>
                    )}
                    {item.location && <p>{item.location}</p>}
                  </div>
                  <div>
                    <p>
                      <strong>{item.companyName}</strong>
                    </p>
                    {item.position && (
                      <p>
                        <em>{item.position}</em>
                      </p>
                    )}
                    {item.description && <p>{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
