const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

function createIco(pngBuffers, sizes) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // count of images

  const entries = [];
  for (let i = 0; i < count; i++) {
    const size = sizes[i];
    const buf = pngBuffers[i];
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // image size in bytes
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers]);
}

async function run() {
  const logoPath = path.resolve(__dirname, '../public/assets/Logos/DarkMode Logo.png');
  const publicDir = path.resolve(__dirname, '../public');
  const assetsDir = path.resolve(__dirname, '../public/assets');

  console.log('Reading logo from:', logoPath);

  // Generate PNG sizes
  const sizes = [16, 32, 48, 64, 180, 192, 512];
  const buffers = {};

  for (const s of sizes) {
    buffers[s] = await sharp(logoPath)
      .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toBuffer();
    console.log(`Generated ${s}x${s} PNG (${buffers[s].length} bytes)`);
  }

  // Create multi-res ICO (16, 32, 48)
  const icoBuffer = createIco([buffers[16], buffers[32], buffers[48]], [16, 32, 48]);
  console.log(`Generated multi-res ICO (${icoBuffer.length} bytes)`);

  // Write files to public/
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), buffers[32]);
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), buffers[16]);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), buffers[32]);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), buffers[180]);

  // Write files to public/assets/ as well
  fs.writeFileSync(path.join(assetsDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(assetsDir, 'favicon.png'), buffers[32]);
  fs.writeFileSync(path.join(assetsDir, 'favicon-16x16.png'), buffers[16]);
  fs.writeFileSync(path.join(assetsDir, 'favicon-32x32.png'), buffers[32]);
  fs.writeFileSync(path.join(assetsDir, 'apple-touch-icon.png'), buffers[180]);

  console.log('All favicon assets created successfully!');
}

run().catch(console.error);
