// ...existing code...
// เพิ่ม type definition สำหรับ import.meta.env
// (No need to redeclare ImportMeta interface; Vite provides this type)


import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("VITE_GEMINI_API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateChmodCommand = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `แปลงคำอธิบายสิทธิ์ไฟล์ต่อไปนี้ให้เป็นคำสั่ง chmod ในรูปแบบตัวเลข octal (3 หลัก): "${prompt}"`,
      config: {
        systemInstruction: "คุณเป็นผู้เชี่ยวชาญ Linux ที่แปลงคำอธิบายสิทธิ์เป็นตัวเลข chmod octal 3 หลัก ตอบกลับด้วยตัวเลข 3 หลักเท่านั้น ห้ามมีข้อความอื่น",
        temperature: 0,
      }
    });

    const text = response.text.trim().match(/\d{3}/);
    return text ? text[0] : "ไม่สามารถแปลงได้";
  } catch (error) {
    console.error("Error generating chmod command:", error);
    return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI";
  }
};

export const explainChmodCommand = async (command: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `อธิบายความหมายของ chmod ในรูปแบบตัวเลข octal ต่อไปนี้แบบง่ายๆ สำหรับผู้เริ่มต้น: "${command}"`,
        config: {
            systemInstruction: "คุณเป็นผู้ช่วยสอนที่เป็นมิตร อธิบายคำสั่ง chmod ในภาษาไทยที่เข้าใจง่ายสำหรับผู้เริ่มต้น โดยแบ่งเป็น 'เจ้าของ (User)', 'กลุ่ม (Group)', และ 'คนอื่น (Others)' พร้อมบอกว่าแต่ละส่วนทำอะไรได้บ้าง (อ่าน, เขียน, รัน)",
            temperature: 0.5,
        }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error explaining chmod command:", error);
    return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI";
  }
};
