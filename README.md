# Boot-Gear

> Written in NextJS, with react-bootstrap & emotionJS behind the scenes.\
> Uses Firebase as backend service.\
> Uses doT.js for templating html strings.

- Countinous Build & Deployment on Netlify, with rewrite rules to Firebase Storage.
- Continous Build & Deployment to Firebase, with github action.
- Authentication with Firebase Authentication.
- Transient Datastore with Firebase Realtime Database.
- Persistent Storage with Firebase Storage.
- Backend APIs with Firebase Cloud Functions.

## Configuration Files

- `next.config.js`
- `netlify.(dev|prod).toml`
- `firebase.(dev|prod).json`
- `.env.(development|production).json`

---

## Deployment

### Netlify

> Configuration: netlify.toml

- Rewrites to secondary location for `/blog` (other URI) and Terniary Location (Firebase Storage) for `/:slug`

### Next.js

> Configuration: next.config.js, .env.\*

### Firebase

> Configation: firebase.json

_Deployment is undetaken by Github Action & can also be done via CLI through `npm run fire-deploy`_

#### Firebase Authentication

- Manage Users (only Email)

#### Firebase Realtime Database

- `ccLookup/$customer_id`: Pabbly Customer to User Map
- `subs/\email`: Subscriber Information
- `/users/$user_id`: User Information
  - `customer_id`: User to Pabbly Customer Map
  - `/sites/$slug/timeStamp`: Last Access TimeStamp to verify ownership

```json
{
  "rules": {
    "subs": {
      ".read": true,
      ".write": true
    },
    "users": {
      "$user_id": {
        ".read": "$user_id === auth.uid",
        "sites": {
          ".write": "$user_id === auth.uid"
        }
      }
    }
  }
}
```

#### Firebase Storage

- `/public`: Read Access to All, Write Access to Logged in
  - `\_bin`: To be used to store common misc asset files
  - `\$slug`
    - `/index.html`: End-Point for Terniary Location for `/:slug`
    - `\_bin`: Supporting Assets for Terniary Location

```text
service firebase.storage {
  match /b/{bucket}/o {
    match /internal/{bootgear=**} {
      allow read,write: if request.auth != null;
    }
    match /public/{bootgear=**} {
      allow read;
      allow write: if request.auth != null && (resource == null || (resource.metadata == null || resource.metadata.owner == request.auth.uid));
    }
  }
}
```

#### Firebase Cloud Functions

- `userRegister` **[HOOK]**: Steps
  - Create New Pabbly Customer
  - Connect via Firebase customClaims
  - Add connection to Realtime Database
- `userSync`: Steps
  - Validate FirebaseIdToken in Request Header.
  - Fetch `customer_id` from User customClaims.
  - If not found, fetch `customer_id` from Realtime Database Storage `/users/$uid/customer_id`.
  - If no customer mapping, create a new customer at Pabbly & get `customer_id`.
  - Update Firebase User information to Pabbly Customer.
  - Update Firebase User with `cusomter_id`.
- `payValidate`: Steps
  - Validate Pabbly VerifyHosted Token
  - Integrate
    - Check if Mapping exists from Realtime Database
    - Check if User exists with same customer email
    - Re-Connect Firebase Auth User to Pabbly Customer

---

## Development

- Create local enviroment file
  - `.env.local`: Next.js build variables (copy from .env.development & update respective values)
  - `firebase.json`: Firebase variables (copy from firebase.dev.json & update respective values)
- Setup Firebase CLI (`npm install firebase-tools & firebase login:ci`)
- Set Firebase configuration variables
  - `pabbly.username`: Pabbly Key for Basic Authentication
  - `pabbly.password`: Pabbly Secret for Basic Authentication
- Start Firebase Emulator `npm run fire-serve`
- Serve Next.js `npm run dev`

---

## Architecture

### Data Flow

```text
+---------------------------+           +------------------------------+               +---------------------------+
|   Github                  |           |  Netlify                     |               |    Firebase               |
+---------------------------+           +------------------------------+               +---------------------------+
|                           |           |                              |               |                           |
| +-----------------------+ |           | +--------------------------+ |               | +-----------------------+ |
| |  boot|gear            +--------------->  applanding.page         | |               | |  Storage              | |
| +-----------------------+ |           | +--------------------------+ |               | +-----------------------+ |
| |    `Next.js SSG       | |       +-------+  /blog/*               | |       +---+----->  /public/$siteId      | |
| |                       | |       |   | |                          | |       |   ^   | |    /bin/$screenshots  | |
| +-----------------------+ |       |   | |    /:slug              +-----------+   |   | |    `index.html        | |
|                           |       |   | |                          | |           |   | +-----------------------+ |
| +-----------------------+ |       |   | |    `website-generator  +---------------+   |                           |
| |  website              +-----+   |   | |                          | |           |   | +-----------------------+ |
| +-----------------------+ |   |   |   | |    `subscription       +-----------+   |   | |  Realtime Database    | |
| |    `Jekyll SSG        | |   |   |   | |                          | |       |   |   | +-----------------------+ |
| |      `Forestry.io     | |   |   |   | |    `login              +-------+   |   +----->  /users/$userId       | |
| |                       | |   |   |   | |                          | |   |   |       | |    /sites/$siteId     | |
| +-----------------------+ |   |   |   | +--------------------------+ |   |   |       | |      `appAndroidLink  | |
|                           |   |   |   |                              |   |   |       | |      `appDescription  | |
+---------------------------+   |   |   | +--------------------------+ |   |   |       | |      `appEmailLink    | |
                                +---+----->  cms.applanding.page     | |   |   |       | |      `appFacebookLink | |
                                        | +--------------------------+ |   |   |       | |      `appIcon         | |
                                        |                              |   |   |       | |      `appLink         | |
                                        +------------------------------+   |   |       | |      `appName         | |
                                                                           |   |       | |      `appScreenshot   | |
                                                                           |   |       | |      `appTwitterLink  | |
                                                                           |   |       | |      `timeStamp       | |
                                                                           |   +--------->   /subs               | |
                                                                           |           | |     `email            | |
                                                                           |           | |     `location         | |
                                                                           |           | |     `timestamp        | |
                                                                           |           | +-----------------------+ |
                                                                           |           |                           |
                                                                           |           | +-----------------------+ |
                                                                           +------------->  Authentication       | |
                                                                                       | +-----------------------+ |
                                                                                       |                           |
                                                                                       +---------------------------+

```

### Payment Flow

```text
   +/payments/pre?plan=
   |
   +-+Enforce Login
   |
   +-+Validate plan
   |
   |      (user.idToken)
   +---------------------------->+CF.userSync                        +>+CF.pabblyHook
   |                             |                                   | |
   |                             +-+Validate idToken                 | +-+payment_success
   |                             |                                   |    +
   |                             +-+Get customer_id                  |    +-+Get user from Realtime DB
   |                             | |                                 |    |
   |                             | +-+from user.customClaims         |    +-+If none
   |                             | |                                 |    | |
   |                             | +-+from Realtime-Database         |    | +-+Create New User
   |                             | |                                 |    | |
   |                             | +-+from New Pabbly customer       |    | +-+Send Verification Email
   |                             |                                   |    |
   |                             +-+Update user.name, user.email     |    +-+Sync User-Customer
   |                             |  to Pabbly Customer               |    |
   |                             |                                   |    +-+Set Plan/Product to User
   |                             +-+Sync User-Customer               |       in customClaims & Realtime Database
   |                             |                                   |
   +<----------------------------+                                   |
   |                                                                 |
   +---------------------------->+Pabbly.checkout                    |
                                 |                                   |
                                 |                                   |
       (landing redirect)        |    (hook)                         |
+--------------------------------+-----------------------------------+
|
+->+/payments/post?hostedpage=
   |
   +-----------------------------+CF.payValidate
   |                             |
   |                             +-+Pabbly.verifyHosted
   |                             |
   |                             +-+Get userId from customer_id
   |                             |  using Realtime Database
   |                             |
   |                             +-+Get userId from email
   |                             |  using Firebase Auth
   |                             |
   |                             +-+If no User
   |                             | |
   |                             | +-+Create New User
   |                             | |
   |                             | +-+Send Verification Email
   |                             |
   |                             +-+Sync User-Customer
   |                             |
   +<----------------------------+
   |
   +-+End

```

---

## Pages

- `/payments/pre?plan=$plan`
  - Validates if User & `$plan` exists.
  - Call Firebase Cloud Function Backend API signed by User IdToken.
  - Redirects to Pabbly checkout page with `customer_id`.
- `/payments/post?hostedpage=$hostedpage`
  - Validates `$hostedpage` by hitting Firebase Cloud Function Backend API.
  - Display Thanks.

---

## To-do

- [ ] Subscription Alerts
- [ ] Internationalisation
- [ ] Verbose Error Reporting ( eliminate alert/confirm )
- [ ] Firebase Deployment via Github Actions
- [ ] Fetch All Plans at Build Time
- [ ] Plan Checkout
  - Pre-checkout validations
    - [ ] User is connected to Pabbly Customer. If not, reconnect.
  - Checkout validations
    - [ ] Enforce `?customer_id=` to prefill the page
  - Post-checkout validations
    - [ ] Pabbly Customer has a Firebase Auth User, check via mapping in Realtime Database or by fetching user by customer email.\
           If not, create new user & send email link.
- [ ] Firebase Cloud Functions
  - [ ] userDeregister **[HOOK]**: Steps
    - [ ] Delete Pabbly Customer
  - [ ] subRegister **[CRON]**: Steps
    - [ ] Fetch emails from Firebase Realtime Storage (/subs/\$email)
    - [ ] Create users in Pabbly
    - [ ] Remove from Firebase Realtime Storage
  - [ ] userCustomerSync **[CRON]**: Steps
    - [ ] Creates new Pabbly Customers if none exists for a user
    - [ ] Connects & Maps firebase users to pabbly customers
  - [ ] pabblyEvent: Pabbly Webhook Events
    - [ ] `customer_create`: ''
    - [ ] `customer_delete`: ''
    - [ ] `subscription_activate`: ''
    - [ ] `subscription_create`: ''
    - [ ] `subscription_upgrade`: ''
    - [ ] `subscription_cancel`: ''
    - [x] `payment_success`: ''
    - [ ] `invoice_create`: ''
- [ ] Pabbly
  - [ ] WebHook
  - [ ] Checkout Landing Page

## Issues

- 404 Routes for `/:slug` fallback to Terniary Location (Firebase Storage) with a JSON response
- Flush Primary CDN (Netlify) for Terniary (Firebase Storage) updates
