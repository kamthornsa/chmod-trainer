<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1lQGANTYrSkEbF2c8_yjUxbGBr1qYK0Qf

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

# chmod-trainer

แอปพลิเคชันนี้ช่วยให้ผู้ใช้เรียนรู้และฝึกฝนการใช้งานคำสั่ง chmod ในระบบปฏิบัติการ Linux ผ่านแบบฝึกหัดและบทเรียนที่เข้าใจง่าย

## คุณสมบัติ

- แบบฝึกหัดเกี่ยวกับการตั้งค่าสิทธิ์ไฟล์
- บทเรียนเกี่ยวกับการใช้งาน chmod
- ตัวแปลงสิทธิ์ไฟล์แบบอินเทอร์แอคทีฟ
- แชทบอท AI สำหรับตอบคำถามเกี่ยวกับ chmod

## วิธีการเริ่มต้นใช้งาน

1. ติดตั้ง dependencies:
   ```cmd
   npm install
   ```
2. เริ่มเซิร์ฟเวอร์:
   ```cmd
   npm run dev
   ```
3. เปิดเบราว์เซอร์ที่ http://localhost:5173

## โครงสร้างโปรเจกต์

- `components/` รวมคอมโพเนนต์หลักของแอป
- `hooks/` รวม custom hooks
- `services/` รวมบริการเชื่อมต่อ AI
- `constants.ts` ค่าคงที่ที่ใช้ในแอป
- `types.ts` ประเภทข้อมูล

## ข้อมูลเพิ่มเติม

- พัฒนาโดยใช้ React + Vite
- รองรับภาษาไทย

## ติดต่อ

หากมีข้อเสนอแนะหรือพบปัญหา กรุณาติดต่อผู้พัฒนา
