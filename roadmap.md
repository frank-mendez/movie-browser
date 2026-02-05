# Roadmap

## 🛠 Core Enhancements

- **Watchlist / favorites with persistence**
  - LocalStorage at minimum; Auth + backend (Firebase / Supabase) for cross-device sync.
- **Filtering & sorting**
  - By genre, year, rating, popularity, language.
- **Pagination or infinite scroll**
  - Helps with performance and UX on big result sets.

## 🎬 Rich Media Enhancements

- **Trailer playback embeds (YouTube/Vimeo)**
  - Add right to detail pages; optionally scroll-to-play style.
- **Backdrop carousel and image zoom**
  - Slick visuals make the app feel premium.

## 📈 Personalization

- **User preferences**
  - Remember genres liked, show recommended lists.
- **Recommendations**
  - “Users also watched…” — fetch similar/suggested titles.
- **Recently viewed list**

## 📊 Social & Community

- **Ratings & Reviews**
  - Let users write quick 1–5 star reviews + comments.
- **Share buttons**
  - Share movie to Twitter/FB/WhatsApp from detail view.
- **Lightweight chat/comments**
  - Per movie thread — adds stickiness.

## 🧠 Smart AI / Future-Forward

- **AI genre summarizer**
  - “This looks like a mix of action, adventure and sci-fi with 85% similarity to Inception.”
- **Emotion-based suggestions**
  - If “funny” → show comedy; “sad” → drama — could be a smart tag UI.

## 💅 Quality-of-Life

- **Dark/Light theme toggle + auto-detect**
- **Keyboard shortcuts** (←/→ for navigation, / to search)
- **Offline caching for last visited pages** — feel snappy even with flaky net.

## 🏁 Quick Prioritized Roadmap (Ship fast)

### Phase 1 — Must-have

- Pagination or infinite loading
- Filters (genre, year, rating)
- Better error/empty states
- Favorite list stored in LocalStorage

### Phase 2 — Engagement

- Trailer embeds + image gallery
- User profiles with backend (Firebase/Supabase)
- Personal recommendations

### Phase 3 — Wow factor

- AI powered suggestions
- Social features + comments
- Accessibility audit & improvements
