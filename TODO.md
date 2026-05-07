# Hakika Loans - PayHero Integration TODO

## Status: In Progress

### 1. ✅ Confirm Channel Configuration
   - [x] Channel ID confirmed as 6902 (same as Merchant ID)
   - [x] Channel Name: HAKIKA R PROVISION
   - [x] Credentials match dashboard

### 2. Update Frontend Code ✅ COMPLETE
   - [x] Update payhero.ts: Channel ID 6902, TILL_NAME="HAKIKA R PROVISION", export LIPWA_LINK
   - [x] Added Lipwa fallback link in Verification.tsx  
   - [x] Secrets moved to .env (VITE_PAYHERO_*)

### 3. Production Deployment 🔄 IN PROGRESS
   - [x] GitHub repo: https://github.com/sigeyh/hela-chapchap (main branch updated)
   - [ ] Existing project "hela-chapchap" found - creating NEW distinguished project "hakika-loans-payhero"
   - [ ] Run `vercel` terminal: Answer "Y" to deploy
   - [ ] `vercel --prod` also running - will auto-detect after project creation

### 4. Advanced Features ✅ COMPLETE
   - [x] Auto-generate unique human-readable references (HELA-XXXXX)
   - [x] Pre-fill Payhero checkout link with name, phone, and amount via query params
   - [x] Display reference badge in Verification UI
   - [x] Enhanced error handling with automatic fallback to autofilled Lipwa link
   - [x] Dedicated "Processing Payment" loading page for a premium branded experience

### 5. Backend Webhook (Recommended)
   - [ ] server.js with /api/payhero/webhook
   - [ ] Firebase Admin + Firestore updates

### 6. Testing
   - [ ] End-to-end STK test on production URL
   - [ ] Verify polling logic works

**Next step: Backend webhook server**
- Frontend complete with advanced autofill logic!
- Run `npm run dev` to test the full flow.
- No backend needed for basic flow, but recommended for production verification.
