const toggle = document.getElementById("toggle");
toggle.onclick = () => document.documentElement.classList.toggle("dark");
document.getElementById('general').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'general.html';
    }, 200);
});
document.getElementById('science').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'science.html';
    }, 200);
});
document.getElementById('tech').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'technology.html';
    }, 200);
});
document.getElementById('art').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'art.html';
    }, 200);
});
document.getElementById('music').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'music.html';
    }, 200);
});
document.getElementById('geo').addEventListener('click', ()=> {
    setTimeout(()=> {
        window.location.href = 'geography.html';
    }, 200);
});