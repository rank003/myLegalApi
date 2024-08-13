
// import React from 'react';
// import { Scale } from 'lucide-react';
// import { useWorkspace } from '../context/WorkspaceContext';

// const DynamicCaseBuilder = () => {
//   const { caseContent } = useWorkspace();

//   return (
//     <div className="bg-gradient-to-t from-gray-800 to-gray-900 p-4 h-full flex flex-col">
//       <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
//         <Scale className="mr-2" size={20} /> Dynamic Case Builder
//       </h3>
//       <div className="flex-grow overflow-auto">
//         <div
//           className="w-full h-full bg-gray-700/50 border-gray-600 rounded p-2 text-sm text-gray-300 whitespace-pre-wrap"
//         >
//           {caseContent}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DynamicCaseBuilder;

import React from 'react';
import { Scale } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

const DynamicCaseBuilder = () => {
  const { caseContent } = useWorkspace();

  return (
    <div className="bg-gradient-to-t from-gray-800 to-gray-900 p-4 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
        <Scale className="mr-2" size={20} /> Dynamic Case Builder
      </h3>
      <div className="flex-grow overflow-auto">
        <div
          className="w-full h-full bg-gray-700/50 border-gray-600 rounded p-2 text-sm text-gray-300 whitespace-pre-wrap"
        >
          {caseContent || "No case content available."}
        </div>
      </div>
    </div>
  );
};

export default DynamicCaseBuilder;
