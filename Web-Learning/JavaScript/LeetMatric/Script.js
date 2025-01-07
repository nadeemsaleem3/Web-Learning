document.addEventListener("DOMContentLoaded", function() {


    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");

    //return true or false based on a regex
    function validateUsername(username) {
        if(username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        try {
            if (!username) {
                throw new Error("Username cannot be empty");
            }
    
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            statsContainer.classList.add("hidden");
    
            const apiUrl = `https://leetcode-stats-api.herokuapp.com/${username}`;
    
            const response = await fetch(apiUrl);
    
            if (!response.ok) {
                throw new Error(`Unable to fetch user details. Status: ${response.status}`);
            }
    
            const parsedData = await response.json();
    
            if (!parsedData || Object.keys(parsedData).length === 0) {
                throw new Error("No data found for the provided username.");
            }
    
            console.log("User Data:", parsedData);
            displayUserData(parsedData);
        } catch (error) {
            console.error("Error:", error.message);
            statsContainer.classList.remove("hidden");
            statsContainer.innerHTML = `<p>${error.message}</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }     

    function updateProgress(solved, total, label, circle) {
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }


    function displayUserData(parsedData) {
        // Extract necessary data from the API response
        const totalQues = parsedData.totalQuestions;
        const totalEasyQues = parsedData.totalEasy;
        const totalMediumQues = parsedData.totalMedium;
        const totalHardQues = parsedData.totalHard;
    
        const solvedTotalQues = parsedData.totalSolved;
        const solvedTotalEasyQues = parsedData.easySolved;
        const solvedTotalMediumQues = parsedData.mediumSolved;
        const solvedTotalHardQues = parsedData.hardSolved;
    
        // Update progress circles
        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);
    
        // Prepare card data for submissions
        const cardsData = [
            { label: "Total Solved Questions", value: `${solvedTotalQues}/${totalQues}` },
            { label: "Easy Questions", value: `${solvedTotalEasyQues}/${totalEasyQues}` },
            { label: "Medium Questions", value: `${solvedTotalMediumQues}/${totalMediumQues}` },
            { label: "Hard Questions", value: `${solvedTotalHardQues}/${totalHardQues}` },
            { label: "Acceptance Rate", value: `${parsedData.acceptanceRate.toFixed(2)}%` },
            { label: "Ranking", value: `#${parsedData.ranking}` },
            { label: "Reputation", value: `${parsedData.reputation}` },
        ];
    
        // Log card data for debugging
        console.log("Card Data: ", cardsData);
    
        // Render cards in the container
        cardStatsContainer.innerHTML = cardsData
            .map(
                (data) =>
                    `<div class="card">
                        <h4>${data.label}</h4>
                        <p>${data.value}</p>
                    </div>`
            )
            .join("");
    }    

    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;
        console.log("logggin username: ", username);
        if(validateUsername(username)) {
            fetchUserDetails(username);
        }
    })

})