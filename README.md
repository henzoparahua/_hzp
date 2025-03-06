## So, what is the deal?

Riven is a versatile editor designed to help users focus and organize their data efficiently. Built with focus on Node.js, Slate.js, and Convex, it serves as a general-resolver for storing and managing. Just like the real Ahamkara, Riven empowers users to shape their destiny by their wish, whenever you’re organizing thoughts.

## Cool, but how it works?

You will need to figure out some things about Slate.js, but the core of Riven is pretty straightforward. It calls Oryx for queries (not very accurate, I know) and stores data written either by Oryx or the user themselves. Riven is an application built to provide a clean interface and be effective for those who use it. Oryx, on the other hand, is an old, creepy guy built as a PHP API, designed to fulfill dark necessities. It’s as simple as that.

## How to run this?

- At first, you will just need the following:
  - Convex Server — It can be local or not.
  - Node.js

1. The first step will be simply write: `npm run dev`
2. Create a `.env` file which will hold your `NEXT_PUBLIC_CONVEX_URL` and then run `npx convex dev`

And thats all :p

## File Structure

```bash
.
├── app
│   ├── (components)
│   │   ├── editor
│   │   │   ├── editor.tsx
│   │   │   └── Commands
│   │   │       └── handleKeyDown.tsx
│   │   └── Elements
│   │       ├── ElementsTypes.tsx
│   │       └── RenderElements.tsx
│   ├── ConvexClientProvider.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── convex
│   ├── _generated
│   └── nslookup.ts
└── lib
└── utils.ts
```
