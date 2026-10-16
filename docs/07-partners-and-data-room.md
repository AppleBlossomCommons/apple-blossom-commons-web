# 07 — Partner with Us and Partner Access

*Decided Oct 16, 2026.*

## Partner with Us (`/partners`): public

One page with a short section per partner type and one **"Become a Partner"** button that opens the **partner inquiry form**. Call it an inquiry, never an "application".

### The inquiry form

The first question is "Which best describes you?":

| Type | Follow-up fields (proposal; confirm with owner) |
|---|---|
| Investor | Organization, investment focus (e.g. senior housing, hospitality, mixed-use), typical check size (optional), timeline |
| Operator or brand partner: senior living, healthcare, hospitality, retail | Organization, sector, current markets, product or brand of interest |
| Strategic land buyer or developer | Organization, product type, district(s) of interest, acreage range |
| Public agency or community organization | Organization, topic. Show a note pointing to the Planning Framework page and Contact |
| Other | Free text |

Common fields: name, email, phone (optional), message, how they heard about it, and a consent checkbox linking to `/privacy`.

**The City of Chelan does not use this form.** It reaches Chelan Village through Contact and the Planning Framework page.

Build requirements:
- Validate on the server, with clear inline errors next to each field and labels always visible.
- Use spam protection that is invisible to normal visitors (for example a honeypot plus rate limiting, or a privacy-respecting challenge). Ask the owner before adding a third-party service.
- Submissions go to the owner and Andy by email, and optionally to a simple store. **Ask which email address and which service** before building. Don't guess.
- Confirmation screen: thank them, and say a member of Chelan Village will follow up.

## Partner Access (`/partners/access`): gated, later phase

Andy's decision: an **invite-only login data room**.

Flow:
1. Someone sends a partner inquiry.
2. The owner or Andy approves them.
3. They receive an invitation email. There is no public sign-up.
4. On first sign-in they accept a confidentiality acknowledgement (wording supplied by the owner).
5. They see documents by tier, filtered to what they were granted.

Build requirements:
- **Use a managed sign-in service. Never hand-written authentication or file-security code.** Propose two or three options with trade-offs and costs. The owner decides.
- Files live in private storage and are served only through short-lived signed links after an access check. No public file URLs.
- Keep an access log: who viewed or downloaded what, and when.
- Give the owner and Andy a simple admin view to invite, revoke and assign document access.
- This is its own build phase, after the public pages ship (see `08-build-plan.md`).

Documents planned for Partner Access are listed under "Gated" in `03-content-and-tiers.md`. The JLL appraisal and the Operator/JV target list never go in, not even gated.
