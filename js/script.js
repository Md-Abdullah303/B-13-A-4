const totalCount = document.getElementById("total-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");
const sectionJobCount = document.getElementById("section-job-count");

const mainContainer = document.getElementById("main-container");
const allCardSection = document.getElementById("all-card-section");
const interviewSection = document.getElementById("interview-section");
const rejectedSection = document.getElementById("rejected-section");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

let interviewList = [];
let rejectedList = [];

let currentStatus = "all-filter-btn";

function calculateCount() {
    totalCount.innerText = allCardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
calculateCount();


function showOnly(id) {
    currentStatus = id;
    calculateJobCOunt();
    calculateCount();

    allFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
    interviewFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
    rejectedFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
    allFilterBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");
    interviewFilterBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");
    rejectedFilterBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");

    let givenId = document.getElementById(id);
    givenId.classList.add("bg-[#3B82F6]", "text-white");
    givenId.classList.remove("bg-[#FFFFFF]", "text-[#64748B]")

    if (id === "interview-filter-btn") {
        interviewSection.classList.remove("hidden");
        allCardSection.classList.add("hidden");
        rejectedSection.classList.add("hidden");
        renderInterview();
    } else if (id === "all-filter-btn") {
        allCardSection.classList.remove("hidden");
        interviewSection.classList.add("hidden");
        rejectedSection.classList.add("hidden");
    } else if (id === "rejected-filter-btn") {
        rejectedSection.classList.remove("hidden");
        interviewSection.classList.add("hidden");
        allCardSection.classList.add("hidden");
        renderRejected();
    }
}

function calculateJobCOunt() {
    if (currentStatus === "all-filter-btn") {
        sectionJobCount.innerText = allCardSection.children.length;
    } else if (currentStatus === "interview-filter-btn") {
        sectionJobCount.innerText = interviewList.length;
    } else if (currentStatus === "rejected-filter-btn") {
        sectionJobCount.innerText = rejectedList.length;
    }
}
calculateJobCOunt();

mainContainer.addEventListener("click",
    function (event) {
        const clickedElement = event.target;
        const card = clickedElement.closest(".card");
        const parent = card.parentNode;

        if (event.target.classList.contains("INTERVIEW")) {
            const parentNode = event.target.closest(".card");
            const cardHead = parentNode.querySelector(".card-head").innerText;
            const jobName = parentNode.querySelector(".job-name").innerText;
            const timeSalary = parentNode.querySelector(".time-salary").innerText;
            const status = parentNode.querySelector(".status");
            status.innerText = "INTERVIEW";
            status.classList.remove("text-[#323B49]", "bg-[#EEF4FF]", "border", "border-red-600", "text-red-600");
            status.classList.add("border", "border-green-600", "text-green-600");
            const statusInfo = parentNode.querySelector(".status-info").innerText;
            const dataId = parentNode.getAttribute("data-id");

            const cardInfo = {
                id: dataId,
                cardHead,
                jobName,
                timeSalary,
                status: "INTERVIEW",
                statusInfo,
            }

            let cardExist = interviewList.find(item => item.id === cardInfo.id);

            if (!cardExist) {
                interviewList.push(cardInfo);
            }

            rejectedList = rejectedList.filter(item => item.cardHead != cardInfo.cardHead);

            if (currentStatus === "rejected-filter-btn") {
                renderRejected();
            } else {
                renderInterview();
            }
            calculateCount();




        } else if (event.target.classList.contains("REJECTED")) {
            const parentNode = event.target.closest(".card");
            const cardHead = parentNode.querySelector(".card-head").innerText;
            const jobName = parentNode.querySelector(".job-name").innerText;
            const timeSalary = parentNode.querySelector(".time-salary").innerText;
            const status = parentNode.querySelector(".status");
            status.innerText = "REJECTED";
            status.classList.remove("text-[#323B49]", "bg-[#EEF4FF]", "border", "border-green-600", "text-green-600");
            status.classList.add("border", "border-red-600", "text-red-600");
            const statusInfo = parentNode.querySelector(".status-info").innerText;
            const dataId = parentNode.getAttribute("data-id");

            const cardInfo = {
                id: dataId,
                cardHead,
                jobName,
                timeSalary,
                status: "REJECTED",
                statusInfo,
            }

            let cardExist = rejectedList.find(item => item.id === cardInfo.id);
            if (!cardExist) {
                rejectedList.push(cardInfo);
            }
            interviewList = interviewList.filter(item => item.cardHead != cardInfo.cardHead);

            if (currentStatus === "interview-filter-btn") {
                renderInterview();
            } else {
                renderRejected();
            }
            calculateCount();
        }
        else if (event.target.closest(".deleteBtn")) {
            // const card = event.target.closest(".deleteBtn").parentNode;
            const cardHead = parent.querySelector(".card-head").innerText;
            parent.removeChild(card);

            interviewList = interviewList.filter(item => item.cardHead !== cardHead);
            rejectedList = rejectedList.filter(item => item.cardHead !== cardHead);

            // card.remove();





            calculateCount();
            calculateJobCOunt();

            renderInterview();
            renderRejected();
        }

    }
)

function renderInterview() {
    interviewSection.innerHTML = "";

    if (interviewList.length === 0) {
        interviewSection.innerHTML = `
            <div id="interviewNoJob" class=" text-center flex bg-[#FFFFFF] rounded-lg  items-center justify-center flex-col space-y-2 py-16 border border-black/20">
                <div class="">
                    <img src="./jobs.png" alt="">
                </div>
                <h1 class=" font-semibold text-[20px] sm:text-[40px]">No jobs available</h1>
                <p class=" text-[16px] sm:text-[24px]">Check back soon for new job opportunities</p>
             </div>
        `;
        return;
    }

    for (let interviewItem of interviewList) {
        const div = document.createElement("div");
        div.className = "card hover:shadow-xl transition-all duration-300 bg-[#FFFFFF] p-6 flex justify-between items-start gap-2 border border-[#323B49]/20 rounded-[9px]";
        div.attributes = `data-id="${interviewItem.id}"`;
        // console.log(interviewItem.id)
        div.innerHTML = `
        <!-- card info -->
                <div class="space-y-5">
                    <div class="">
                        <h1 class="card-head font-semibold text-[18px] text-black">${interviewItem.cardHead}</h1>
                        <h2 class="job-name text-[16px] text-gray-600">${interviewItem.jobName}</h2>
                    </div>
                    <p class="time-salary text-[14px] text-gray-600">${interviewItem.timeSalary}</p>
                    <div class="flex flex-col items-start">
                        <p class="status text-[14px] border border-green-600 text-green-600  rounded-[7px] py-2.5 px-3.5 font-semibold mb-2.5">${interviewItem.status}</p>
                        <p class="status-info text-[14px] text-gray-600 ">${interviewItem.statusInfo}</p>
                    </div>
                    <!-- btn grp  -->
                    <div class=" flex items-center gap-2.5">
                        <button class="INTERVIEW py-2 px-3 border border-green-600 text-green-600 rounded-lg">INTERVIEW</button>
                        <button class="REJECTED py-2 px-3 border border-red-600 text-red-600 rounded-lg">REJECTED</button>
                    </div>
                </div>

                <!-- card deleted -->
                <div class="deleteBtn border cursor-pointer relative p-1.5 rounded-full border-[#323B49]/20"><i
                        class="fa-solid fa-trash-can text-[#323B49]/80"></i></div>
        `;
        interviewSection.appendChild(div);
    }
}
function renderRejected() {
    rejectedSection.innerHTML = "";

    if (rejectedList.length === 0) {
        rejectedSection.innerHTML = `
            <div id="interviewNoJob" class=" text-center flex bg-[#FFFFFF] rounded-lg  items-center justify-center flex-col space-y-2 py-16 border border-black/20">
                <div class="">
                    <img src="./jobs.png" alt="">
                </div>
                <h1 class=" font-semibold text-[20px] sm:text-[40px]">No jobs available</h1>
                <p class=" text-[16px] sm:text-[24px]">Check back soon for new job opportunities</p>
             </div>
        `;
        return;
    }

    for (let rejectedItem of rejectedList) {
        const div = document.createElement("div");
        div.className = "card hover:shadow-xl transition-all duration-300 bg-[#FFFFFF] p-6 flex justify-between items-start gap-2 border border-[#323B49]/20 rounded-[9px]";
        div.attributes = `data-id="${rejectedItem.id}"`;
        div.innerHTML = `
        <!-- card info -->
                <div class="space-y-5">
                    <div class="">
                        <h1 class="card-head font-semibold text-[18px] text-black">${rejectedItem.cardHead}</h1>
                        <h2 class="job-name text-[16px] text-gray-600">${rejectedItem.jobName}</h2>
                    </div>
                    <p class="time-salary text-[14px] text-gray-600">${rejectedItem.timeSalary}</p>
                    <div class="flex flex-col items-start">
                        <p class="status text-[14px] border border-red-600 text-red-600  rounded-[7px] py-2.5 px-3.5 font-semibold mb-2.5">${rejectedItem.status}</p>
                        <p class="status-info text-[14px] text-gray-600 ">${rejectedItem.statusInfo}</p>
                    </div>
                    <!-- btn grp  -->
                    <div class=" flex items-center gap-2.5">
                        <button class="INTERVIEW py-2 px-3 border border-green-600 text-green-600 rounded-lg">INTERVIEW</button>
                        <button class="REJECTED py-2 px-3 border border-red-600 text-red-600 rounded-lg">REJECTED</button>
                    </div>
                </div>

                <!-- card deleted -->
                <div class="deleteBtn border cursor-pointer relative p-1.5 rounded-full border-[#323B49]/20"><i
                        class="fa-solid fa-trash-can text-[#323B49]/80"></i></div>
        `;
        rejectedSection.appendChild(div);
    }
}


