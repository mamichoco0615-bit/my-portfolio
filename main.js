// ===== year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== mobile menu =====
const toggle = document.querySelector(".navToggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        const opened = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(opened));
        // アイコンっぽく（簡易）
        toggle.classList.toggle("is-open", opened);
    });

    // メニュークリックで閉じる
    nav.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.classList.remove("is-open");
        });
    });

    // 外側クリックで閉じる
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.classList.remove("is-open");
        }
    });
}

// ===== reveal on scroll =====
const els = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("is-show");
    });
}, { threshold: 0.15 });

els.forEach(el => io.observe(el));

// ===== simple filter =====
const list = document.getElementById("worksList");
const btns = document.querySelectorAll(".chipBtn");

if (list && btns.length) {
    const items = Array.from(list.querySelectorAll(".workCard"));

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("is-active"));
            btn.classList.add("is-active");

            const f = btn.dataset.filter;
            items.forEach(card => {
                const cat = card.dataset.cat;
                const show = (f === "all") || (cat === f);
                card.style.display = show ? "" : "none";
            });
        });
    });
}

// ===== modal details (fake) =====
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

const detailMap = {
    modal1: {
        title: "保護猫カフェさくら（架空）",
        text: "やさしい世界観のサイト。トップ〜下層ページまで整えた想定で、遊び心のある演出も実装可能です。",
        points: ["レスポンシブ対応", "アニメーション（スクロール/ホバー）", "UI設計（導線・読みやすさ）"]
    },
    modal2: {
        title: "西表島の民宿サイト（架空）",
        text: "海→ジャングル→沖縄風景へ背景が切り替わるコンセプト。旅行のワクワクが伝わる見せ方を意識。",
        points: ["コンセプト設計", "背景切替の演出案", "写真/文章のトーン設計"]
    },
    modal3: {
        title: "ヘッドスパ LP（架空）",
        text: "お悩み訴求→メニュー→予約導線がスムーズなLP構成。落ち着いた雰囲気を大切に。",
        points: ["LP構成", "予約導線設計", "信頼感のデザイン"]
    },
    modal4: {
        title: "バナーデザイン（架空）",
        text: "水彩テイストで柔らかく。SNS・キャンペーン用など、トーンに合わせて制作可能です。",
        points: ["ターゲットに合わせた配色", "視認性（文字の強弱）", "SNSサイズ展開"]
    },
};

function openModal(key) {
    if (!modal || !modalContent) return;
    const d = detailMap[key];
    if (!d) return;

    modalContent.innerHTML = `
    <h3>${d.title}</h3>
    <p>${d.text}</p>
    <h3>ポイント</h3>
    <ul>
      ${d.points.map(p => `<li>${p}</li>`).join("")}
    </ul>
  `;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open]");
    if (openBtn) {
        e.preventDefault();
        openModal(openBtn.dataset.open);
    }

    if (e.target.matches("[data-close]")) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});