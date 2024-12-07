// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useParams } from "next/navigation";
// import { getConversationMessages, sendMessage } from "../../../../actions/chat";

// export default function ChatPage() {
//     const { psychologistId } = useParams();
//     //const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [psychologist, setPsychologist] = useState({ name: "", photo: "" });
//     const [newMessage, setNewMessage] = useState("");

// const messages=  [
//     {
//         "content": "Cześć! Jak się czujesz?",
//         "isMine": false
//     },
//     {
//         "content": "Cześć! Bardzo źle, nie mogę przestać myśleć o tym, co się stało.",
//         "isMine": true  
//     },
// ];

//     // const fetchMessages = useCallback(async () => {
//     //     setLoading(true);
//     //     setError(null);
//     //     try {
//     //         const response = await getConversationMessages(psychologistId as string);
//     //         setMessages(response.messages);
//     //         setPsychologist(response.psychologist);
//     //     } catch {
//     //         setError("Wystąpił błąd podczas ładowania wiadomości.");
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // }, [psychologistId]);

//     const handleSendMessage = async () => {
//         if (!newMessage.trim()) return;
//         try {
//             await sendMessage(newMessage, psychologistId    as string);
//             //fetchMessages();
//             setNewMessage("");
//         } catch {
//             setError("Nie udało się wysłać wiadomości.");
//         }
//     };


//     // useEffect(() => {
//     //     if (!psychologistId) return;
//     //     ///fetchMessages();
//     // }, [fetchMessages, psychologistId]);

//     return (
//         <div className="w-full max-w-4xl mx-auto mt-12">
//             {loading ? (
//                 <p>Ładowanie...</p>
//             ) : error ? (
//                 <p className="text-red-500">{error}</p>
//             ) : (
//                 <>
//                     <div className="flex items-center mb-6">
//                         <img
//                             src={psychologist.photo}
//                             alt={psychologist.name}
//                             className="w-16 h-16 rounded-full mr-4"
//                         />
//                         <h1 className="text-2xl font-bold">Rozmowa z {psychologist.name}</h1>
//                     </div>
//                     <div className="bg-gray-100 rounded-lg p-4 mb-4 h-96 overflow-y-scroll">
//                         {messages.map((message, index) => (
//                             <div
//                                 key={index}
//                                 className={`mb-2 ${message.isMine ? "text-right" : "text-left"}`}
//                             >
//                                 <span
//                                     className={`inline-block px-4 py-2 rounded-lg ${message.isMine ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
//                                 >
//                                     {message.content}
//                                 </span>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="flex items-center">
//                         <input
//                             type="text"
//                             value={newMessage}
//                             onChange={(e) => setNewMessage(e.target.value)}
//                             className="flex-1 border rounded-lg p-2"
//                             placeholder="Napisz wiadomość..."
//                         />
//                         <button
//                             onClick={handleSendMessage}
//                             className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                         >
//                             Wyślij
//                         </button>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }
