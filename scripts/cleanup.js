const fs = require('fs');
const path = require('path');

const filesToProcess = [
    'assets/data/data.json',
    'assets/js/form.js',
    'assets/js/lightbox.js',
    'assets/js/renderers.js',
    'assets/js/theme.js',
    'data/content.json',
    'pages/about.html',
    'pages/gallery.html',
    'pages/services.html',
    'index.html'
];

filesToProcess.forEach(file => {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Instagram and IDs
        content = content.replace(/ishika_professional_salon_spa/gi, 'rr_studio_official');
        content = content.replace(/ishika-theme/gi, 'rr-theme');
        
        // WhatsApp & Text
        content = content.replace(/\*ISHIKA PROFESSIONAL SALON & SPA\*/gi, '*RR Studio - JAGADISH CREATION*');
        content = content.replace(/Ishika Salon Artist at Work/gi, 'RR Studio Photographer at Work');
        content = content.replace(/Ishika salon gallery image/gi, 'RR Studio gallery image');
        content = content.replace(/Ishika Photography/gi, 'RR Studio');
        
        // HTML specific
        content = content.replace(/>ISHIKA</g, '>RR Studio<');
        content = content.replace(/>ISHIKA<span>Photography<\/span></g, '>RR Studio<span>Photography</span><');
        
        fs.writeFileSync(fullPath, content);
        console.log(`Cleaned: ${file}`);
    }
});

// Update or create .gitignore
const gitignorePath = path.join(__dirname, '..', '.gitignore');
let gitignoreContent = '';
if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
}
if (!gitignoreContent.includes('node_modules')) {
    fs.appendFileSync(gitignorePath, '\nnode_modules\n');
    console.log('Added node_modules to .gitignore');
}

console.log('All cleanup tasks completed successfully!');
