# Novel App

## Table of Contents

1.  [General Info](#general-info)
2.  [Technologies](#technologies)
3.  [FAQs](#faqs)

### General Info

---

Novel App is a community-based marketplace for books. New users verify their location and are served a list of books within their neighborhood. Quickly list and sell books using our ISBN lookup or barcode scanner and upload images. Create a user profile where you can easily view your listings, favorited items and past purchases. Chat with buyers and sellers and arrange transactional meetings.

Deployed website: https://novel-market.herokuapp.com/

Login: cody@gmail.com / cody123

## Technologies

---

A list of technologies used within the project:

* Backend: Express, PostgreSQL, Sequelize
* Frontend: React, Redux
* Styling: Bootstrap / Material UI
* Libraries/APIs: Google Maps API, Google Books API, Quagga Barcode Scanner

* Novel is a Progressive Web Application

## FAQs

---

A list of frequently asked questions

1.  **How to run Novel locally**

    * npm install
    * npm run seed to seed sample data
    * npm run start-dev
    * navigate to localhost:8080 to view novel in your browser

2.  **What's Novel all about?**

* An estimated 640,000 tons of books are brought to the landfill every year. Through upcyling, we can help decrease the amount of books thrown away. We created Novel to help people be able to buy and sell secondary market books.
* We want to help grow community engagement - to the end, we felt a cart and checkout functionality is impersonal and opted to have buyers and sellers meet in person to foster a personal connection between book lovers in their own neighborhoods.

3.  **What is geolocation bubble used?**
    Users are served books and users within a 3km radius of their verified location.

4.  **What's next for Novel?**
    Our goals for the future of Novel are:

    * Rating System: With a rating system, users would be able to rate their transaction partner with a five-point rating scale. This adds a layer of security to ensure both buyers and sellers are held to a standard of excellence.
    * Offline Accessibility (service workers): Implementing the Service workers will provide offline access. It will also enable the applications to control network requests, cache those request to improve performance. When the application offline, it can still access to cached content.
    * Events feed page for book-related discussions: To further fostering a growing sense of community, this feature would provide a space for users to discuss common interests and arrange for local events.
