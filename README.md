[README_EDITING.txt](https://github.com/user-attachments/files/31034544/README_EDITING.txt)
GARY & VERONA WEDDING WEBSITE — EASY EDIT GUIDE

LIVE DOMAIN
garyandverona.com

FOLDER STRUCTURE
index.html
css/styles.css
js/site.js
images/
  hero.jpg
  our-story.jpg
  engagement-01.jpg
  engagement-02.jpg
  engagement-03.png

HOW TO CHANGE A PHOTO WITHOUT TOUCHING THE DESIGN
1. Decide which picture you want to change.
2. Rename your replacement picture to the SAME filename.
   Example: to change the main homepage photo, rename your new JPG to:
   hero.jpg
3. In GitHub, open the images folder.
4. Upload the replacement file with the same filename.
5. Commit the change.
6. GitHub Pages will redeploy automatically.

TIP:
Try to use photos with similar orientation:
- hero.jpg: vertical or tall portrait
- our-story.jpg: vertical portrait
- engagement-01.jpg: flexible
- engagement-02.jpg: flexible
- engagement-03.png: wide/landscape works best

HOW TO CHANGE TEXT
1. Open index.html in GitHub.
2. Click the pencil/edit icon.
3. Press Ctrl+F and search for one of these labels:
   OUR STORY
   WEDDING DETAILS
   TRAVEL + HOTEL INFORMATION
   RSVP
4. Change only the wording between the HTML tags.
5. Commit the change.

HOW TO CHANGE THE RSVP LINK
In index.html, search for:
Replace the # below with your RSVP form/web address.

Change:
href="#"

to something like:
href="https://example.com/rsvp"

IMPORTANT
Do not rename index.html.
Do not delete the css, js, or images folders.
Keep image filenames exactly the same when replacing photos.
