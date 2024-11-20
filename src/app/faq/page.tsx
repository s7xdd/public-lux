import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import Faq from '@/shared-pages/faq';

// const FAQSection = () => {
//   return (
//     <section style={{ padding: '100px 0' }}>
//       <div className="container mx-auto px-4 md:px-6 lg:px-8">
//         <div className="max-w-3xl shadow-lg mx-auto p-6 bg-white rounded-lg">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//             Frequently Asked Questions
//           </h1>

//           {/* FAQ Accordion 1 */}
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMore />}
//               aria-controls="panel1a-content"
//               id="panel1a-header"
//             >
//               <Typography>What is your return policy?</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Our return policy allows returns within 30 days of purchase.
//                 Please ensure the item is in its original condition.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>

//           {/* FAQ Accordion 2 */}
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMore />}
//               aria-controls="panel2a-content"
//               id="panel2a-header"
//             >
//               <Typography>How do I track my order?</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 You can track your order using the tracking number provided in
//                 your confirmation email.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>

//           {/* FAQ Accordion 3 */}
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMore />}
//               aria-controls="panel3a-content"
//               id="panel3a-header"
//             >
//               <Typography>Do you offer international shipping?</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Typography>
//                 Yes, we offer international shipping to select countries. Please
//                 check our shipping policy for more details.
//               </Typography>
//             </AccordionDetails>
//           </Accordion>
//         </div>
//       </div>
//     </section>
//   );
// };

const Main = () => {
  return (
    <main>
      <Faq/>
    </main>
  );
};

export default Main;
