// Fetch and display announcements
db.collection("announcements").orderBy("createdAt", "desc").get()
    .then(snapshot => {
        const announcementsList = document.getElementById("announcements-list");
        snapshot.forEach(doc => {
            const announcement = doc.data();
            const li = document.createElement("li");
            li.textContent = `${announcement.message} - ${new Date(announcement.createdAt.seconds * 1000).toLocaleDateString()}`;
            announcementsList.appendChild(li);
        });
    })
    .catch(error => {
        console.error("Error fetching announcements:", error);
    });
