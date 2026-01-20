// ============ DASHBOARD.JS - DARK MODE TOGGLE ============
const toggle = document.getElementById("toggle");
toggle.onclick = () => document.documentElement.classList.toggle("dark");

// ============ DASHBOARD.JS - CATEGORY NAVIGATION ============
// --- navGeneral: Go to general quiz
document.getElementById('general').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'general.html';
    }, 200);
});
// --- navScience: Go to science quiz
document.getElementById('science').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'science.html';
    }, 200);
});
// --- navTech: Go to technology quiz
document.getElementById('tech').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'technology.html';
    }, 200);
});
// --- navArt: Go to art & culture quiz
document.getElementById('art').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'art.html';
    }, 200);
});
// --- navMusic: Go to music quiz
document.getElementById('music').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'music.html';
    }, 200);
});
// --- navGeo: Go to geography quiz
document.getElementById('geo').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'geography.html';
    }, 200);
});