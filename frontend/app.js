// frontend/app.js
async function getRecommendations() {
  const userId = document.getElementById("userId").value;
  const alpha = document.getElementById("alpha").value;

  const res = await fetch(
    `http://localhost:5000/recommend?user_id=${userId}&alpha=${alpha}&top_n=10`,
  );
  const data = await res.json();

  const html = data.recommendations
    .map(
      (m, i) => `
    <div class="card">
      <h3>${i + 1}. ${m.title}</h3>
      <div class="scores">
        <span>CF: ${m.cf_score}</span>
        <span>CB: ${m.cb_score}</span>
        <strong>Hybrid: ${m.hybrid_score}</strong>
      </div>
      <div class="bar">
        <div class="fill" style="width:${m.hybrid_score * 100}%"></div>
      </div>
    </div>
  `,
    )
    .join("");

  document.getElementById("results").innerHTML = html;
}
