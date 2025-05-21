import { useState } from 'react';
import { Code, Database, Download } from 'lucide-react';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Provide Your Schema',
      description: 'Paste your SQL table schema or define fields manually.',
      icon: <Code size={32} />,
      details:
        'Simply paste your existing SQL table definition or use our visual field editor to define your data structure. We support all major SQL data types and constraints.',
    },
    {
      id: 2,
      title: 'Get Auto-Generated SQL Insert Code',
      description:
        'Our engine creates realistic dummy data as ready-to-use INSERT statements.',
      icon: <Database size={32} />,
      details:
        'Our AI-powered engine analyzes your schema and generates contextually appropriate data for each field. Get realistic names, addresses, dates, and more that match your field constraints.',
    },
    {
      id: 3,
      title: 'Copy or Download the Script',
      description:
        'One click to copy or download the SQL script for immediate use in your database.',
      icon: <Download size={32} />,
      details:
        'Export your generated INSERT statements with a single click. Ready to run in any SQL database that matches your schema.',
    },
  ];

  return (
    <div id="works" className="bg-gray-900 text-gray-100 py-16 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It <span className="text-blue-400">Works</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Generate realistic SQL insert statements in seconds with powerful
            data gemini engine
          </p>
        </div>

        {/* Steps Desktop */}
        <div className="hidden md:flex justify-between items-start mb-12">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center w-full max-w-xs mx-4"
              onMouseEnter={() => setActiveStep(index)}
            >
              <div
                className={`flex items-center justify-center h-20 w-20 rounded-full mb-6 transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-blue-600 text-white transform scale-110'
                    : 'bg-gray-800 text-blue-400'
                }`}
              >
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">
                {step.id}. {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Step Connectors for Desktop */}
        <div className="hidden md:flex justify-center items-center mb-12">
          <div className="flex items-center w-full max-w-4xl mx-auto">
            <div className="h-1 flex-1 bg-gray-800"></div>
            <div className="h-3 w-3 rounded-full mx-2 bg-blue-500"></div>
            <div className="h-1 flex-1 bg-gray-800"></div>
            <div className="h-3 w-3 rounded-full mx-2 bg-blue-500"></div>
            <div className="h-1 flex-1 bg-gray-800"></div>
          </div>
        </div>

        {/* Steps Mobile */}
        <div className="md:hidden space-y-8">
          {steps.map(step => (
            <div key={step.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <div className="bg-blue-600 text-white h-12 w-12 rounded-full flex items-center justify-center mr-4">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {step.id}. {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Step Details */}
        <div className="bg-gray-800 rounded-lg p-8 mt-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-blue-600 text-white h-16 w-16 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8">
              {steps[activeStep].icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">
                {steps[activeStep].title}
              </h3>
              <p className="text-gray-300">{steps[activeStep].details}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
