import { useEffect, useRef, useState } from 'react';
import styles from './Preview.module.css';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export default function Preview({ resumeData }) {
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
      resizeObserver.unobserve(containerDiv);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.previewContainer} ref={containerRef}>
      <div className={styles.preview} style={{ transform: `scale(${scale})` }}>
        <div className={styles.personal}>
          <h1>{resumeData.fullName}</h1>
          <ul className={styles.contact}>
            {resumeData.email && (
              <li>
                <span className="material-symbols-outlined">mail</span>
                {resumeData.email}
              </li>
            )}
            {resumeData.phoneNumber && (
              <li>
                <span className="material-symbols-outlined">call</span>
                {resumeData.phoneNumber}
              </li>
            )}
            {resumeData.location && (
              <li>
                <span className="material-symbols-outlined">location_on</span>
                {resumeData.location}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
