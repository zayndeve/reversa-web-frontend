import React, { useEffect, useState } from "react";
import "../../css/homePage.css";

const statData = [
  { id: 1, number: 5000, title: "Happy Customers", desc: "Trusted by fashion lovers" },
  { id: 2, number: 200, title: "Luxury Products", desc: "Delivered worldwide" },
  { id: 3, number: 24, title: "Premium Support", desc: "Always here for you" },
  { id: 4, number: 50, title: "Global Branches", desc: "Expanding luxury reach" },
];

const Counter = ({ targetNumber }: { targetNumber: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = targetNumber;
    if (start === end) return;

    let incrementTime = 20; // ms per increment
    const step = Math.ceil(end / 50);

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [targetNumber]);

  return <span>{count}+</span>;
};

export default function Statistics() {
  return (
    <div className="lux-statistics">
      {statData.map((stat, index) => (
        <div className="lux-statistic-item" key={stat.id}>
          <div className="lux-stat-number">
            <Counter targetNumber={stat.number} />
          </div>
          <div className="lux-stat-title">{stat.title}</div>
          <div className="lux-stat-desc">{stat.desc}</div>
          {index !== statData.length - 1 && <div className="lux-stat-divider"></div>}
        </div>
      ))}
    </div>
  );
}
