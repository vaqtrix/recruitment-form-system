# Recruitment Form System — React / Next.js Edition

Web Engineering — Assignment 2. Ek hi **Recruitment Form** ko teen alag approaches
mein banaya gaya hai, taake traditional se modern architecture tak ka evolution samajh aaye
(ASP.NET Web Forms → MVC → ASP.NET Core MVC ka JavaScript equivalent).

| # | Folder | Represents | Stack |
|---|--------|-----------|-------|
| 1 | `1-react-spa` | Web Forms (event-driven) | React + Vite |
| 2 | `2-react-mvc` | ASP.NET MVC (MVC + routing) | React + React Router |
| 3 | `3-nextjs` | ASP.NET Core MVC (modern, server-side) | Next.js (App Router) |

Teenon forms mein same fields hain: Full Name, Email, Phone, Gender, Qualification,
Experience, Skills, CV Upload, Submit — poori client-side validation ke saath.
Project 3 mein **server-side validation** bhi hai (Server Action).

---

## Requirements

- **Node.js 18+** install hona chahiye — <https://nodejs.org> se LTS version.
- Check karne ke liye terminal mein: `node -v`

---

## Locally run kaise karein

Har project alag hai. Terminal open karke us folder mein jaayein, phir:

### 1) React SPA
```bash
cd 1-react-spa
npm install
npm run dev
```
Browser mein khulega: `http://localhost:5173`

### 2) React MVC
```bash
cd 2-react-mvc
npm install
npm run dev
```
`http://localhost:5173` — form `/apply` par hai, submit karne par `/success` route khulta hai.

### 3) Next.js
```bash
cd 3-nextjs
npm install
npm run dev
```
Browser mein: `http://localhost:3000`

> Har project ke liye `npm install` sirf **pehli baar** chalana hai.

---

## GitHub par kaise daalein

1. GitHub par ek naya **repository** banayein (e.g. `recruitment-form-system`).
2. Is `recruitment-form-system` folder ke andar terminal khol kar:

```bash
git init
git add .
git commit -m "Recruitment form system - 3 projects"
git branch -M main
git remote add origin https://github.com/USERNAME/recruitment-form-system.git
git push -u origin main
```
(`USERNAME` ki jagah apna GitHub username daalein.)

> `node_modules` aur `dist`/`.next` folders `.gitignore` mein hain, isliye woh GitHub par
> nahi jaayenge — yeh bilkul sahi hai. Deploy ke waqt Vercel khud install karega.

---

## Vercel par deploy kaise karein

Vercel ek repo se ek waqt mein **ek project** deploy karta hai. Kyunki humare paas
teen alag folders (projects) hain, har ek ka apna Vercel project banega — bas **Root
Directory** us folder par set karni hai.

### Steps
1. <https://vercel.com> par GitHub se login karein.
2. **Add New → Project** → apna `recruitment-form-system` repo select karein → **Import**.
3. **Root Directory** ke aage **Edit** dabayein aur woh folder chunein jo deploy karna hai:
   - Next.js ke liye: `3-nextjs`  ← *(yeh sabse behtar deploy karta hai, recommend)*
   - React SPA ke liye: `1-react-spa`
   - React MVC ke liye: `2-react-mvc`
4. **Framework Preset** automatically detect ho jaayega:
   - `3-nextjs` → **Next.js**
   - `1-react-spa` / `2-react-mvc` → **Vite**
5. **Deploy** dabayein. 1–2 minute mein live URL mil jaayega.

Teenon ko deploy karna ho to yeh step **teen baar** repeat karein (har baar alag Root
Directory choose karke) — har project ka apna live link aa jaayega.

### Settings agar manually chahiye ho
| Project | Build Command | Output Directory |
|---------|---------------|------------------|
| `1-react-spa` | `npm run build` | `dist` |
| `2-react-mvc` | `npm run build` | `dist` |
| `3-nextjs` | `npm run build` | *(auto — Next.js)* |

> `2-react-mvc` mein `vercel.json` diya gaya hai taake page refresh par routing na toote
> (SPA fallback).

---

## Kaunsa project assignment mein "kaunse ASP.NET" ke barabar hai

| ASP.NET (assignment) | Yahan | Kyun match |
|---|---|---|
| Web Forms — event-driven | React SPA | Components + state + event handlers |
| ASP.NET MVC | React + Router | Model / View / Controller + routing |
| ASP.NET Core MVC | Next.js | Server components + server-side validation + Vercel |

---

## Folder overview

```
recruitment-form-system/
├── 1-react-spa/        # single event-driven component
├── 2-react-mvc/
│   └── src/
│       ├── models/         # data + validation rules
│       ├── views/          # form + success screens
│       └── controllers/    # state + submit logic
└── 3-nextjs/
    └── app/
        ├── lib/model.js    # validation (client + server)
        ├── actions.js      # server action (server-side validation)
        ├── apply/          # form page
        └── success/        # confirmation page
```
