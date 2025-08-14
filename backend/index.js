const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const mammoth = require('mammoth');
const Papa = require('papaparse');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });
let startups = [];

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded');
  }
  try {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ path: file.path });
      const text = result.value.trim();
      const lines = text.split('\n').filter(Boolean);
      const headers = lines[0].split('\t');
      startups = lines.slice(1).map(line => {
        const values = line.split('\t');
        const obj = {};
        headers.forEach((h, i) => {
          obj[h.trim()] = values[i] ? values[i].trim() : '';
        });
        return obj;
      });
    } else if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      const csv = fs.readFileSync(file.path, 'utf8');
      const parsed = Papa.parse(csv, { header: true });
      startups = parsed.data.filter(row => Object.keys(row).some(key => row[key]));
    } else {
      return res.status(400).send('Unsupported file type');
    }
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error parsing file');
  } finally {
    fs.unlinkSync(file.path);
  }
});

app.get('/startups', (req, res) => {
  res.json(startups);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
