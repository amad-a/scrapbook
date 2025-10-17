import ejs from "ejs";
import fs from "fs";
const outputDir = "./";

const textObjects = [
    '<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis impedit optio ipsa molestiae, neque vel, velit, itaque ullam nesciunt esse error perspiciatis delectus magni veritatis rerum! Eaque, omnis ipsam! Eaque!</div>',
    '<div><a href="https://google.com">google this!</a></div>'
]


function readImageDirs() {
  fs.readdir("public/images", (err, dirs) => {
    if (err) {
      console.error("error reading dir:", err);
      return;
    }
    console.log("dirs:", dirs);
    for (let dirName of dirs) {
      fs.readdir(`public/images/${dirName}`, (err, dir) => {
        let htmlContent = "";
        if (dir.length > 0) {
          console.log("DRRR", dirName);
          const htmlContent = ejs.renderFile(
            "generator-template.ejs",
            {
              title: "titty",
              images: dir,
              contentDir: dirName,
              textObjects: textObjects
            },
            (err, html) => {
              // Generate a unique filename for each HTML file
              const filename = `${dirName}.html`;

              // Write the HTML content to the file
              fs.writeFile(filename, html, "utf8", (err, dir) => {
                if (err) console.error("error generating html file:", err);
                return;
              });
            }
          );
        }
      });
    }
  });
}

function generateTemplate(imageArray) {}

readImageDirs();
generateTemplate();
