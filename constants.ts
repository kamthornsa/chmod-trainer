
import { Exercise, ExerciseType } from './types';

export const LESSONS = [
  {
    title: 'พื้นฐานสิทธิ์ไฟล์/โฟลเดอร์',
    content: `
      <p>ในระบบปฏิบัติการ Linux/Unix ทุกไฟล์และโฟลเดอร์จะมีสิ่งที่เรียกว่า "สิทธิ์" (Permissions) กำกับอยู่ เพื่อควบคุมว่าใครสามารถทำอะไรกับไฟล์หรือโฟลเดอร์นั้นได้บ้าง โดยแบ่งผู้ใช้งานเป็น 3 ประเภท:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>User (เจ้าของ):</strong> คือผู้ที่สร้างไฟล์หรือโฟลเดอร์นั้นๆ โดยปกติจะมีสิทธิ์เต็มที่</li>
        <li><strong>Group (กลุ่ม):</strong> คือกลุ่มของผู้ใช้งานที่ถูกกำหนดไว้ เจ้าของไฟล์สามารถกำหนดให้ไฟล์นั้นอยู่ในกลุ่มใดกลุ่มหนึ่งได้ สมาชิกในกลุ่มจะมีสิทธิ์ตามที่กำหนด</li>
        <li><strong>Others (คนอื่น):</strong> คือผู้ใช้งานคนอื่นๆ ทั้งหมดที่ไม่ได้เป็นเจ้าของและไม่ได้อยู่ในกลุ่ม</li>
      </ul>
      <p class="mt-4">และสิทธิ์พื้นฐานมี 3 อย่าง:</p>
       <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>Read (r):</strong> สิทธิ์ในการอ่านไฟล์ หรือแสดงรายชื่อไฟล์ในโฟลเดอร์</li>
        <li><strong>Write (w):</strong> สิทธิ์ในการแก้ไขหรือลบไฟล์ หรือสร้าง/ลบไฟล์ในโฟลเดอร์</li>
        <li><strong>Execute (x):</strong> สิทธิ์ในการรันไฟล์ (ถ้าเป็นโปรแกรม) หรือเข้าถึงโฟลเดอร์ (cd)</li>
      </ul>
    `,
  },
  {
    title: 'รูปแบบสัญลักษณ์ (Symbolic Mode)',
    content: `
      <p>รูปแบบสัญลักษณ์เป็นการแสดงสิทธิ์ในรูปแบบที่มนุษย์อ่านเข้าใจง่ายที่สุด โดยจะแสดงเป็นชุดตัวอักษร 10 ตัว เช่น <code>-rwxr-xr--</code></p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>ตัวแรก:</strong> บอกประเภทของไฟล์ (<code>-</code> คือไฟล์ทั่วไป, <code>d</code> คือไดเรกทอรี/โฟลเดอร์)</li>
        <li><strong>3 ตัวถัดมา (rwx):</strong> คือสิทธิ์ของ <strong>User</strong> (เจ้าของ)</li>
        <li><strong>3 ตัวถัดมา (r-x):</strong> คือสิทธิ์ของ <strong>Group</strong> (กลุ่ม)</li>
        <li><strong>3 ตัวสุดท้าย (r--):</strong> คือสิทธิ์ของ <strong>Others</strong> (คนอื่น)</li>
      </ul>
      <p class="mt-4">ตัวอักษร <code>r</code>, <code>w</code>, <code>x</code> หมายถึงมีสิทธิ์นั้นๆ ส่วน <code>-</code> หมายถึงไม่มีสิทธิ์นั้น</p>
      <p class="mt-2">จากตัวอย่าง <code>-rwxr-xr--</code> หมายความว่า:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>เจ้าของ (User):</strong> อ่าน, เขียน, และรันได้ (rwx)</li>
        <li><strong>กลุ่ม (Group):</strong> อ่านและรันได้ แต่เขียนไม่ได้ (r-x)</li>
        <li><strong>คนอื่น (Others):</strong> อ่านได้อย่างเดียว (r--)</li>
      </ul>
    `,
  },
  {
    title: 'รูปแบบตัวเลข (Octal Mode)',
    content: `
      <p>รูปแบบตัวเลขหรือ Octal เป็นวิธีที่นิยมใช้ในการกำหนดสิทธิ์อย่างรวดเร็วด้วยคำสั่ง <code>chmod</code> โดยใช้เลขฐาน 8 ซึ่งเกิดจากการแปลงค่าสิทธิ์แต่ละอย่างเป็นตัวเลข:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>Read (r)</strong> = 4</li>
        <li><strong>Write (w)</strong> = 2</li>
        <li><strong>Execute (x)</strong> = 1</li>
      </ul>
      <p class="mt-4">เราจะนำตัวเลขของสิทธิ์ที่มีมารวมกันสำหรับแต่ละประเภทผู้ใช้ (User, Group, Other) เช่น:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><code>rwx</code> = 4 + 2 + 1 = <strong>7</strong></li>
        <li><code>rw-</code> = 4 + 2 + 0 = <strong>6</strong></li>
        <li><code>r-x</code> = 4 + 0 + 1 = <strong>5</strong></li>
        <li><code>r--</code> = 4 + 0 + 0 = <strong>4</strong></li>
        <li><code>-wx</code> = 0 + 2 + 1 = <strong>3</strong></li>
        <li><code>-w-</code> = 0 + 2 + 0 = <strong>2</strong></li>
        <li><code>--x</code> = 0 + 0 + 1 = <strong>1</strong></li>
        <li><code>---</code> = 0 + 0 + 0 = <strong>0</strong></li>
      </ul>
      <p class="mt-4">ดังนั้น สิทธิ์แบบสัญลักษณ์ <code>rwxr-xr--</code> จะถูกแปลงเป็น Octal ได้เป็น <strong>754</strong></p>
    `,
  },
  {
    title: 'การใช้งานคำสั่ง chmod',
    content: `
      <p>คำสั่ง <code>chmod</code> (change mode) ใช้สำหรับเปลี่ยนสิทธิ์ของไฟล์และโฟลเดอร์ มีรูปแบบการใช้งานพื้นฐานคือ:</p>
      <pre class="bg-gray-800 p-3 rounded-md my-2 text-cyan-300"><code>chmod [permissions] [filename]</code></pre>
      <p>เราสามารถใช้ได้ทั้งรูปแบบ Octal และ Symbolic เช่น:</p>
      <ul class="list-disc list-inside space-y-2 mt-2">
        <li><strong>การใช้ Octal:</strong> <code>chmod 755 script.sh</code> (กำหนดสิทธิ์เป็น rwxr-xr-x)</li>
        <li><strong>การใช้ Symbolic:</strong>
          <ul class="list-disc list-inside ml-6 space-y-1">
            <li><code>chmod u+x script.sh</code> (เพิ่มสิทธิ์ Execute ให้ User)</li>
            <li><code>chmod g-w script.sh</code> (ลบสิทธิ์ Write ของ Group)</li>
            <li><code>chmod o=r script.sh</code> (กำหนดสิทธิ์ของ Others ให้เป็น Read อย่างเดียว)</li>
          </ul>
        </li>
      </ul>
      <p class="mt-4">แอปพลิเคชันนี้จะเน้นไปที่การใช้รูปแบบ Octal ซึ่งเป็นที่นิยมและใช้งานบ่อย</p>
    `,
  },
];

export const EXERCISES: Exercise[] = [
  {
    type: ExerciseType.OctalToSymbolic,
    question: "แปลงค่า Octal <strong>755</strong> เป็นรูปแบบ Symbolic",
    answer: "rwxr-xr-x",
  },
  {
    type: ExerciseType.OctalToSymbolic,
    question: "แปลงค่า Octal <strong>644</strong> เป็นรูปแบบ Symbolic",
    answer: "rw-r--r--",
  },
  {
    type: ExerciseType.OctalToSymbolic,
    question: "แปลงค่า Octal <strong>700</strong> เป็นรูปแบบ Symbolic",
    answer: "rwx------",
  },
  {
    type: ExerciseType.SymbolicToOctal,
    question: "แปลงค่า Symbolic <strong>rwxrwxrwx</strong> เป็นรูปแบบ Octal",
    answer: "777",
  },
  {
    type: ExerciseType.SymbolicToOctal,
    question: "แปลงค่า Symbolic <strong>rw-r-----</strong> เป็นรูปแบบ Octal",
    answer: "640",
  },
  {
    type: ExerciseType.SymbolicToOctal,
    question: "แปลงค่า Symbolic <strong>r-xr-x---</strong> เป็นรูปแบบ Octal",
    answer: "550",
  },
  {
    type: ExerciseType.Scenario,
    question: "คุณต้องการให้ไฟล์ <code>config.txt</code> สามารถ <strong>อ่านและเขียน</strong> ได้โดย <strong>เจ้าของ</strong> เท่านั้น ส่วนคนอื่นห้ามทำอะไรเลย ควรใช้คำสั่ง chmod แบบ Octal อย่างไร?",
    answer: "600",
  },
  {
    type: ExerciseType.Scenario,
    question: "คุณมีสคริปต์ <code>deploy.sh</code> ที่ต้องการให้ <strong>เจ้าของ</strong> รันได้ (อ่าน-เขียน-รัน) สมาชิกใน <strong>กลุ่ม</strong> รันได้ (อ่าน-รัน) ส่วน <strong>คนอื่น</strong> อ่านได้อย่างเดียว ควรใช้ค่า Octal ใด?",
    answer: "754",
  },
];
