import React, { useEffect, useState } from 'react';

const BarChart = ({ data, labels }: { data: number[]; labels: string[] }) => {
    const [animatedData, setAnimatedData] = useState<number[]>(Array(data.length).fill(0));
    const [labelsVisible, setLabelsVisible] = useState<boolean[]>(Array(labels.length).fill(false));
    const maxValue = Math.max(...data);

    useEffect(() => {
        // Animacja słupków
        const timeout = setTimeout(() => setAnimatedData(data), 100);

        // Animacja etykiet
        const labelTimeouts = labels.map((_, index) =>
            setTimeout(() => {
                setLabelsVisible((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                });
            }, 200 + index * 100)
        );

        return () => {
            clearTimeout(timeout);
            labelTimeouts.forEach((t) => clearTimeout(t));
        };
    }, [data, labels]);

    return (
        <div className="w-fit mx-auto">
            <div className="flex flex-col items-center">
                <div className="relative flex items-end h-64 border-b border-gray-600/50">
                    {animatedData.map((value, index) => (
                        <div
                            key={index}
                            className="flex-1 mx-1 relative flex justify-center"
                            style={{ height: `${(value / maxValue) * 100}%`, transition: 'height 0.5s ease' }}
                        >
                            <div
                                className="w-10 bg-gradient-to-t from-gradient-1 to-gradient-1/50 rounded-t-md"
                                style={{ height: "100%" }}
                            ></div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between w-full mt-2 px-2">
                    {labels.map((label, index) => (
                        <span
                            key={index}
                            className={`text-sm text-gray-300 transition-all duration-500 ease-out`}
                            style={{
                                opacity: labelsVisible[index] ? 1 : 0,
                                transform: labelsVisible[index] ? 'translateY(0)' : 'translateY(10px)',
                            }}
                        >
              {label}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BarChart;
