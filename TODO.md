# Hakika Loans - PayHero Integration TODO

## Status: In Progress

### 1. ✅ Confirm Channel Configuration
   - [x] Channel ID confirmed as 6902 (same as Merchant ID)
   - [x] Channel Name: HAKIKA R PROVISION
   - [x] Credentials match dashboard

### 2. Update Frontend Code
   - [x] Update payhero.ts: Add TILL_NAME constant, use in description/reference, export LIPWA_LINK
   - [x] Add Lipwa Link in Verification.tsx as fallback  
   - [x] Move secrets to .env (VITE_ prefixed)


### 3. Backend Webhook Server
   - [ ] Create server.js (Express + Firebase Admin)
   - [ ] Add /api/payhero/webhook endpoint
   - [ ] Update Firestore on callback
   - [ ] npm init for backend deps

### 4. Testing
   - [ ] Test STK push end-to-end
   - [ ] Verify polling works
   - [ ] Test webhook (if backend)

### 5. Production
   - [ ] Deploy instructions
   - [ ] Update webhook URL for prod

**Next step: Backend webhook server**
- Frontend complete! Run `npm run dev` to test STK push flow.
- No backend needed for basic polling, but recommended for production webhooks.
