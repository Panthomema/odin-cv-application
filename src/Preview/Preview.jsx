import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import styles from './Preview.module.css';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export default function Preview({
  resumeData: { personal, experience, education },
}) {
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

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
      resizeObserver.disconnect();
    };
  }, [scale]);

  return (
    <div className={styles.previewContainer} ref={containerRef}>
      <div className={styles.preview} style={{ transform: `scale(${scale})` }}>
        <PersonalSection personal={personal} />
        <div className={styles.content}>
          <ExperienceSection experience={experience} />
          <EducationSection education={education} />
        </div>
      </div>
    </div>
  );
}

function PersonalSection({ personal }) {
  return (
    <div className={styles.personal}>
      <h1>{personal.fullName}</h1>
      <ul className={styles.contact}>
        {personal.email && (
          <li>
            <span className="material-symbols-outlined">mail</span>
            {personal.email}
          </li>
        )}
        {personal.phoneNumber && (
          <li>
            <span className="material-symbols-outlined">call</span>
            {personal.phoneNumber}
          </li>
        )}
        {personal.location && (
          <li>
            <span className="material-symbols-outlined">location_on</span>
            {personal.location}
          </li>
        )}
      </ul>
    </div>
  );
}

function ExperienceSection({ experience }) {
  const visibleExperience = experience.filter(({ visible }) => visible);

  if (!visibleExperience.length) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Professional Experience</h2>
      {visibleExperience.map((item) => (
        <div key={item.id} className={styles.sectionItem}>
          <div className={styles.itemHeader}>
            <div>
              <p>
                <strong>{item.companyName}</strong>
              </p>
              {item.position && (
                <p>
                  <em>{item.position}</em>
                </p>
              )}
            </div>
            <div>
              {item.startDate && (
                <p className={styles.itemDate}>
                  {format(new Date(item.startDate), 'MMMM yyyy')} -{' '}
                  {item.endDate !== ''
                    ? format(new Date(item.endDate), 'MMMM yyyy')
                    : 'Present'}
                </p>
              )}
              {item.location && <p>{item.location}</p>}
            </div>
          </div>
          {item.description && (
            <p>
              {item.description.split('\n').map((line, index) => (
                <span key={`${item.id}-${index}`}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function EducationSection({ education }) {
  const visibleEducation = education.filter(({ visible }) => visible);

  if (!visibleEducation.length) return null;

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Education</h2>
      {visibleEducation.map((item) => (
        <div key={item.id} className={styles.sectionItem}>
          <div className={styles.itemHeader}>
            <div>
              <p>
                <strong>{item.institutionName}</strong>
              </p>
              {item.title && (
                <p>
                  <em>{item.title}</em>
                </p>
              )}
            </div>
            <div>
              {item.startDate && (
                <p className={styles.itemDate}>
                  {format(new Date(item.startDate), 'MMMM yyyy')} -{' '}
                  {item.endDate !== ''
                    ? format(new Date(item.endDate), 'MMMM yyyy')
                    : 'Present'}
                </p>
              )}
              {item.location && <p>{item.location}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

