import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting shop seed...");

  // 1. Create Brands
  const brandsData = [
    'Arduino', 'Raspberry Pi', 'Adafruit', 'SparkFun', 'STMicroelectronics', 
    'Espressif', 'Texas Instruments', 'Schneider Electric', 'ABB', 'Siemens'
  ];

  const brands = {};
  for (const name of brandsData) {
    brands[name] = await prisma.shopBrand.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  // 2. Create Categories
  const categoriesData = [
    { name: 'Microcontrollers', subs: ['Arduino Boards', 'ESP8266/ESP32', 'Development Kits'] },
    { name: 'Sensors', subs: ['Environmental', 'Motion & Position', 'Optical'] },
    { name: 'Electrical', subs: ['Switchgear', 'Motors & Drives', 'Relays'] },
    { name: 'Displays', subs: ['LCD Modules', 'OLED', 'TFT'] }
  ];

  const categories = {};
  const subCategories = {};

  for (const cat of categoriesData) {
    const mainCat = await prisma.shopCategory.upsert({
      where: { name: cat.name },
      update: {},
      create: { name: cat.name }
    });
    categories[cat.name] = mainCat;

    for (const subName of cat.subs) {
      // Find or create sub-category
      let sub = await prisma.shopSubCategory.findFirst({
        where: { name: subName, categoryId: mainCat.id }
      });
      if (!sub) {
        sub = await prisma.shopSubCategory.create({
          data: { name: subName, categoryId: mainCat.id }
        });
      }
      subCategories[subName] = sub;
    }
  }

  // 3. Create 20 Products
  const productsData = [
    { name: 'Arduino Uno R3', cat: 'Microcontrollers', sub: 'Arduino Boards', brand: 'Arduino', price: 4500, desc: 'The classic Arduino board for beginners and pros alike.' },
    { name: 'Raspberry Pi 4 Model B (4GB)', cat: 'Microcontrollers', sub: 'Development Kits', brand: 'Raspberry Pi', price: 18500, desc: 'High-performance computer for edge computing and IoT.' },
    { name: 'ESP32-WROOM-32D', cat: 'Microcontrollers', sub: 'ESP8266/ESP32', brand: 'Espressif', price: 1200, desc: 'Powerful Wi-Fi + BT + BLE MCU module.' },
    { name: 'DHT22 Temperature & Humidity Sensor', cat: 'Sensors', sub: 'Environmental', brand: 'Adafruit', price: 950, desc: 'Digital sensor for measuring temperature and humidity.' },
    { name: 'HC-SR04 Ultrasonic Sensor', cat: 'Sensors', sub: 'Motion & Position', brand: 'SparkFun', price: 450, desc: 'Non-contact distance measurement module.' },
    { name: 'STM32 Nucleo-64', cat: 'Microcontrollers', sub: 'Development Kits', brand: 'STMicroelectronics', price: 6500, desc: 'Versatile dev board for STM32 microcontrollers.' },
    { name: '16x2 I2C LCD Display', cat: 'Displays', sub: 'LCD Modules', brand: 'Adafruit', price: 1500, desc: 'Blue backlight character LCD with I2C interface.' },
    { name: '0.96 inch OLED Display', cat: 'Displays', sub: 'OLED', brand: 'Adafruit', price: 2200, desc: '128x64 pixels SSD1306 monochrome display.' },
    { name: 'MCB 2-Pole 16A', cat: 'Electrical', sub: 'Switchgear', brand: 'Schneider Electric', price: 3200, desc: 'Miniature Circuit Breaker for residential and commercial use.' },
    { name: 'Contactor 9A 230V AC', cat: 'Electrical', sub: 'Relays', brand: 'ABB', price: 5800, desc: 'Reliable magnetic contactor for motor control.' },
    { name: 'Servo Motor SG90', cat: 'Electrical', sub: 'Motors & Drives', brand: 'SparkFun', price: 650, desc: 'Small 9g servo for hobby projects and robotics.' },
    { name: 'NEMA 17 Stepper Motor', cat: 'Electrical', sub: 'Motors & Drives', brand: 'Siemens', price: 4200, desc: 'High torque stepper motor for 3D printers and CNCs.' },
    { name: 'Arduino Nano Every', cat: 'Microcontrollers', sub: 'Arduino Boards', brand: 'Arduino', price: 3800, desc: 'Smallest form factor Arduino board with powerful ATMega4809.' },
    { name: 'MPU6050 6-Axis Gyro/Accel', cat: 'Sensors', sub: 'Motion & Position', brand: 'SparkFun', price: 1100, desc: 'MEMS motion tracking device.' },
    { name: 'BME280 Pressure/Temp/Hum', cat: 'Sensors', sub: 'Environmental', brand: 'Adafruit', price: 2800, desc: 'Precision sensor for barometric pressure and environmental sensing.' },
    { name: '3.5 inch TFT Touch Screen', cat: 'Displays', sub: 'TFT', brand: 'Adafruit', price: 8500, desc: 'Large color display with resistive touch panel for Raspberry Pi/Arduino.' },
    { name: 'L298N Dual Motor Driver', cat: 'Electrical', sub: 'Motors & Drives', brand: 'STMicroelectronics', price: 1200, desc: 'High power H-bridge driver for DC and Stepper motors.' },
    { name: 'Smart Relay (Logo!)', cat: 'Electrical', sub: 'Relays', brand: 'Siemens', price: 35000, desc: 'Compact programmable logic controller for automation.' },
    { name: 'Arduino Mega 2560 R3', cat: 'Microcontrollers', sub: 'Arduino Boards', brand: 'Arduino', price: 7500, desc: 'Large memory board for complex projects.' },
    { name: 'PIR Motion Sensor', cat: 'Sensors', sub: 'Motion & Position', brand: 'Adafruit', price: 550, desc: 'Infrared sensor for detecting human movement.' }
  ];

  for (const p of productsData) {
    await prisma.shopProduct.create({
      data: {
        name: p.name,
        description: p.desc,
        price: p.price,
        images: ["https://placehold.co/600x600/012A43/FFF?text=" + encodeURIComponent(p.name)],
        categoryId: categories[p.cat].id,
        subCategoryId: subCategories[p.sub].id,
        brandId: brands[p.brand].id,
        documentation: 'https://techknowlk.com/docs/sample.pdf'
      }
    });
  }

  console.log("Seeding finished. Added 20 products.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
