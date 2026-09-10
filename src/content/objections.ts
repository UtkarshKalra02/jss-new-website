/**
 * Objection handling.
 *
 * Structure adapted from the "Looking for ___ but: not sure of / confused
 * about / worried about / frustrated by ___" template in the strategy
 * document. Each entry names a fear a real packaging buyer carries, then
 * answers it with something the company actually does — not a slogan.
 */
export const objections = [
  {
    fear: "Worried the colour will drift on the reprint",
    answer:
      "The pack that arrives in month nine has to match the one already on shelf. Board, ink and finishing specifications are recorded per SKU and held on file, so a repeat order is produced against the original standard rather than re-approved from scratch.",
  },
  {
    fear: "Been burned by a supplier who missed the launch date",
    answer:
      "Most packaging delays come from work being sent out to job workers for die-cutting, lamination or foiling. Printing, cutting, finishing, patching and gluing run in-house here, which removes the handoffs where schedules usually slip.",
  },
  {
    fear: "Not sure the structure will survive our packing line",
    answer:
      "A physical sample is produced and approved before production starts, so squaring, pop-open behaviour and fit are assessed in hand rather than on a screen.",
  },
  {
    fear: "Confused about which board, GSM or finish you actually need",
    answer:
      "That is a normal place to start. Tell us the product, how it ships and where it sells, and we will recommend a specification and explain the trade-off — including where a cheaper option is genuinely the right call.",
  },
  {
    fear: "Quoted cheaper elsewhere and unsure what you would be giving up",
    answer:
      "Ask what the cheaper quote assumes. Board grade, GSM, number of colours and whether finishing is subcontracted are the four variables that move the price — and the ones that later show up as rejects, delays or a pack that reads cheap. We will quote against a stated specification so the comparison is like for like.",
  },
  {
    fear: "Afraid of being treated as a small account",
    answer:
      "Enquiries go to a person, not a queue. You get a direct phone number and a WhatsApp line, and we respond within 24 hours whether the enquiry is for a first run or an annual contract.",
  },
];

/**
 * The "questions buyers have before they commit" list — the strategy
 * document's top-10-criteria idea, applied to packaging procurement.
 * Rendered as an FAQ and emitted as FAQPage structured data.
 */
export const faqs = [
  {
    q: "What packaging formats do you manufacture?",
    a: "Monocartons, rigid boxes, corrugated boxes, printed sleeves, window patch boxes, display and counter units, and printed labels — along with other custom paper-based packaging. If your requirement does not fit a standard format, send the product dimensions and we will advise on the structure.",
  },
  {
    q: "Is production handled in-house or subcontracted?",
    a: "Offset printing, die-cutting, lamination, window patching and premium finishing including foiling, embossing and debossing all run in the company's own facility in Okhla Phase-II, New Delhi.",
  },
  {
    q: "Are you certified?",
    a: "Yes. JSS The Print Zone operates an ISO 9001 certified quality management system, which governs how jobs are planned, produced, inspected and released.",
  },
  {
    q: "What is your minimum order quantity?",
    a: "Minimum quantity depends on the format, board and finish, because setup effort differs sharply between a plain monocarton and a foiled rigid box. Share your format and target volume and we will confirm the workable minimum for your specification.",
  },
  {
    q: "How long does an order take?",
    a: "Lead time is driven by the specification, the finishing involved and the quantity. We confirm a firm date against your approved sample rather than quoting a generic figure up front — and we would rather commit to a date we can hold.",
  },
  {
    q: "Can you work from our existing dieline and artwork?",
    a: "Yes. Send your dieline and print-ready artwork and we will check it against cut, crease, glue and bleed areas before production. If you do not have a dieline, we will develop one from your product dimensions.",
  },
  {
    q: "Do you provide samples before production?",
    a: "Yes. A physical sample is produced so the structure and finish can be assessed in hand. Production runs only against an approved sample.",
  },
  {
    q: "Do you supply outside Delhi NCR?",
    a: "Yes. The facility is in Okhla Phase-II, New Delhi, and consignments are packed for transit and dispatched to your delivery location. Share the destination with your enquiry and we will factor it into the quotation.",
  },
  {
    q: "Can you handle recurring and contract volumes?",
    a: "Yes — recurring supply is the core of the business. Specifications are held on file between runs so repeat orders are produced against the original approved standard.",
  },
  {
    q: "What information do you need to quote?",
    a: "Dimensions, board or material preference if you have one, number of print colours, finish required, and quantity. If you do not have all of it, send what you have — most first enquiries arrive incomplete and that is fine.",
  },
];

/**
 * Secondary offer. The strategy document argues for a low-commitment offer
 * alongside the primary CTA, for buyers who are researching rather than
 * ready to enquire. Presented inline rather than as an exit popup.
 */
export const vendorChecklist = {
  title: "Before you finalise any packaging supplier",
  intro:
    "Most packaging problems are visible in the quotation, not in the delivery. These are the questions worth putting to every supplier you are evaluating — including this one.",
  items: [
    {
      q: "Which processes do you run in-house, and which go out to job workers?",
      why: "Every external handoff is a place where registration drifts and delivery dates slip. Ask specifically about die-cutting, lamination, foiling and patching.",
    },
    {
      q: "What board grade and GSM is this quotation based on?",
      why: "Two quotations are not comparable until the board is stated. This is the single most common reason a cheaper price is not actually cheaper.",
    },
    {
      q: "Will I get a physical sample before production?",
      why: "Structural problems are almost impossible to catch on a screen. A supplier unwilling to sample is asking you to carry the risk.",
    },
    {
      q: "How do you hold colour across repeat orders?",
      why: "Ask whether specifications are recorded per SKU. If colour is re-approved from scratch each time, expect drift on shelf.",
    },
    {
      q: "What is the committed lead time, measured from what point?",
      why: "From enquiry, from artwork approval, or from sample sign-off? The three can differ by weeks.",
    },
    {
      q: "Who is my point of contact once the order is placed?",
      why: "A named person who answers the phone is worth more than any brochure claim about service.",
    },
    {
      q: "Are you certified, and to what standard?",
      why: "A quality certification is not a guarantee of good work, but it does tell you inspection and release are documented processes rather than habits.",
    },
  ],
};
