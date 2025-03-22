const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const notifier = require('node-notifier');

const downloadsPath = path.join(require('os').homedir(), 'Downloads');

showStartMonitoringNotification(downloadsPath);

function showStartMonitoringNotification(folderPath) {
  notifier.notify({
    title: 'Download Folder is currently Monitoring by RanShield',
    message: `Now monitoring the folder: ${folderPath}`,
    icon: path.join(__dirname, 'Scripts', 'images', 'scan.jpeg'),
  });
}


const watcher = chokidar.watch(downloadsPath, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
});

watcher
  .on('add', (filePath) => {
    console.log(`File ${filePath} has been added`);
    if (path.extname(filePath).toLowerCase() === '.bat') {
      if (checkForMaliciousContent(filePath)) {
        preventDownload(filePath);
      }
    }
  })
  .on('unlink', (filePath) => console.log(`File ${filePath} has been removed`));

console.log(`Watching for changes in ${downloadsPath}`);

function checkForMaliciousContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`Content of ${filePath}:\n${content}`);

    // Check for specific key terms in the content
    const keyTerms = ['@echo off', 'net user %username%', 'Rundll32.exe user32.dll,LockWorkStation'];

    if (keyTerms.some(term => content.includes(term))) {
      console.warn(`Malicious content detected in file ${filePath}!`);
      showMaliciousFileWarning(filePath);
      return true;
    }

    return false;
  } catch (err) {
    console.error(`Error reading ${filePath}: ${err.message}`);
    return false;
  }
}

function preventDownload(filePath) {
  fs.unlinkSync(filePath);
  console.log(`File ${filePath} deleted to prevent download.`);
}

function showMaliciousFileWarning(filePath) {
  console.warn(`The file ${path.basename(filePath)} contains potentially harmful content. It has been prevented from downloading.`);

  // Display a notification using node-notifier with a custom image
  notifier.notify({
    title: 'Malicious File Detected',
    message: `The file ${path.basename(filePath)} contains potentially harmful content. It has been prevented from downloading.`,
    icon: path.join(__dirname, 'images', 'ransomware.jpg'), 
  });
}




/*const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const notifier = require('node-notifier');

const downloadsPath = path.join(require('os').homedir(), 'Downloads');

const watcher = chokidar.watch(downloadsPath, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
});

watcher
  .on('add', (filePath) => {
    console.log(`File ${filePath} has been added`);
    if (path.extname(filePath).toLowerCase() === '.bat') {
      if (checkForMaliciousContent(filePath)) {
        preventDownload(filePath);
      }
    }
  })
  .on('unlink', (filePath) => console.log(`File ${filePath} has been removed`));

console.log(`Watching for changes in ${downloadsPath}`);

function checkForMaliciousContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`Content of ${filePath}:\n${content}`);

    // Check for specific key terms in the content
    const keyTerms = ['@echo off', 'net user %username%', 'Rundll32.exe user32.dll,LockWorkStation'];

    if (keyTerms.some(term => content.includes(term))) {
      console.warn(`Malicious content detected in file ${filePath}!`);
      showMaliciousFileWarning(filePath);
      return true;
    }

    return false;
  } catch (err) {
    console.error(`Error reading ${filePath}: ${err.message}`);
    return false;
  }
}

function preventDownload(filePath) {
  fs.unlinkSync(filePath);
  console.log(`File ${filePath} deleted to prevent download.`);
}

function showMaliciousFileWarning(filePath) {
  console.warn(`The file ${path.basename(filePath)} contains potentially harmful content. It has been prevented from downloading.`);

  // Display a notification using node-notifier
  notifier.notify({
    title: 'Malicious File Detected',
    message: `The file ${path.basename(filePath)} contains potentially harmful content. It has been prevented from downloading.`,
  });
}*/




/*const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

const downloadsPath = path.join(require('os').homedir(), 'Downloads');

const watcher = chokidar.watch(downloadsPath, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
});

watcher
  .on('add', (filePath) => {
    console.log(`File ${filePath} has been added`);
    if (path.extname(filePath).toLowerCase() === '.bat') {
      if (checkForMaliciousContent(filePath)) {
        preventDownload(filePath);
      }
    }
  })
  .on('unlink', (filePath) => console.log(`File ${filePath} has been removed`));

console.log(`Watching for changes in ${downloadsPath}`);

function checkForMaliciousContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`Content of ${filePath}:\n${content}`);
    
    // Check for specific key terms in the content
    const keyTerms = ['@echo off', 'net user %username%', 'Rundll32.exe user32.dll,LockWorkStation'];
    
    if (keyTerms.some(term => content.includes(term))) {
      console.warn(`Malicious content detected in file ${filePath}!`);
      showMaliciousFileWarning(filePath);
      return true;
    }
    
    return false;
  } catch (err) {
    console.error(`Error reading ${filePath}: ${err.message}`);
    return false;
  }
}

function preventDownload(filePath) {
  fs.unlinkSync(filePath);
  console.log(`File ${filePath} deleted to prevent download.`);
}

function showMaliciousFileWarning(filePath) {
  console.warn(`The file ${path.basename(filePath)} contains potentially harmful content. It has been prevented from downloading.`);
  
}
*/


/*const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
const { dialog } = require('electron');

const downloadsPath = path.join(require('os').homedir(), 'Downloads');

const watcher = chokidar.watch(downloadsPath, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
});

watcher
  .on('add', (filePath) => {
    console.log(`File ${filePath} has been added`);
    if (path.extname(filePath).toLowerCase() === '.bat') {
      if (checkForMaliciousContent(filePath)) {
        preventDownload(filePath);
      }
    }
  })
  .on('unlink', (filePath) => console.log(`File ${filePath} has been removed`));

console.log(`Watching for changes in ${downloadsPath}`);

function checkForMaliciousContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`Content of ${filePath}:\n${content}`);
    
    // Check for specific key terms in the content
    const keyTerms = ['@echo off', 'net user %username%', 'Rundll32.exe user32.dll,LockWorkStation'];
    
    if (keyTerms.some(term => content.includes(term))) {
      console.warn(`Malicious content detected in file ${filePath}!`);
      showMaliciousFileWarning(filePath);
      return true;
    }
    
    return false;
  } catch (err) {
    console.error(`Error reading ${filePath}: ${err.message}`);
    return false;
  }
}

function preventDownload(filePath) {
  fs.unlinkSync(filePath);
  console.log(`File ${filePath} deleted to prevent download.`);
}

function showMaliciousFileWarning(filePath) {
  dialog.showMessageBoxSync({
    type: 'warning',
    title: 'Malicious File Detected',
    message: `The file ${path.basename(filePath)} contains potentially harmful content. It has been prevented from downloading.`,
    buttons: ['OK'],
  });
}
*/

/*

const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs').promises;  // Use promises version of fs
const { dialog } = require('electron');

const downloadsPath = path.join(require('os').homedir(), 'Downloads');

const watcher = chokidar.watch(downloadsPath, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
});

watcher
  .on('add', async (filePath) => {
    console.log(`File ${filePath} has been added`);
    if (path.extname(filePath).toLowerCase() === '.bat') {
      if (await checkForMaliciousContent(filePath)) {
        await preventDownload(filePath);
      }
    }
  })
  .on('unlink', (filePath) => console.log(`File ${filePath} has been removed`));

console.log(`Watching for changes in ${downloadsPath}`);

async function checkForMaliciousContent(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    console.log(`Content of ${filePath}:\n${content}`);
    
    // Check for specific key terms in the content
    const keyTerms = ['@echo off', 'net user %username%', 'Rundll32.exe user32.dll,LockWorkStation'];
    
    if (keyTerms.some(term => content.includes(term))) {
      console.warn(`Malicious content detected in file ${filePath}!`);
      showMaliciousFileWarning(filePath);
      return true;
    }
    
    return false;
  } catch (err) {
    console.error(`Error reading ${filePath}: ${err.message}`);
    return false;
  }
}

async function preventDownload(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`File ${filePath} deleted to prevent download.`);
  } catch (err) {
    console.error(`Error deleting ${filePath}: ${err.message}`);
  }
}

function showMaliciousFileWarning(filePath) {
  dialog.showMessageBoxSync({
    type: 'warning',
    title: 'Malicious File Detected',
    message: `The file ${path.basename(filePath)} contains potentially harmful content. It has been prevented from downloading.`,
    buttons: ['OK'],
  });
}


*/