# Photo, date of birth, location — what the evidence says

Researched 2026-09-18. Commissioned because Momin asked for a recommendation on
whether his face, his date of birth and his address belong on the site, aimed at
getting hired in Europe and the United States.

**Standing caveat on all three:** the entire audit literature measures *application
documents*, not personal websites. Nobody has studied what a photo on a personal
site does to hiring outcomes. Every recommendation below is extrapolation from CV
experiments, and the extrapolation is stated, not hidden.

---

## PHOTO

**Recommendation: no portrait in the home page hero. A real photo on the About
page. None on the résumé page.**

### The number that drives it

"In your face", *Socio-Economic Review* 2023 — ~13,000 applications across Germany,
the Netherlands and Spain, randomising racial appearance by photograph:

| Photo shown | Callback rate |
|---|---|
| White | 39.83% |
| **No photo** | **38.51%** |
| Dark-skinned Caucasian | 33.66% |
| Asian / Indigenous | 32.10% |
| Black | 28.30% |

https://academic.oup.com/ser/article/21/3/1551/7086060

No photo landed within ~1.3 points of the White rate and beat the Asian-phenotype
photo by 6.4 points. Note this is photo-vs-no-photo on CVs that **still carried the
applicant's name** — so the name does not absorb the effect. The photo costs
something on its own.

### Supporting

- **GEMM harmonised experiment**, N≈19,181, six countries: Pakistani-origin
  applicants in the UK needed roughly **70% more applications** than identical
  white British applicants — worst-affected group in the study, alongside
  African-origin. https://www.tandfonline.com/doi/full/10.1080/1369183X.2019.1622744
- **Quillian et al.**: no decline in hiring discrimination across six Western
  countries over time; MENA-origin discrimination *increased* in the 2000s vs the
  1990s. https://www.pnas.org/doi/10.1073/pnas.2212875120
- **"Discrimination Unveiled"**, ESR 2023: identical CVs, photo with vs without
  hijab — Netherlands ~70% vs ~35%, Germany ~53% vs ~25%. Photos get read for group
  membership, actively.
- **Nielsen Norman Group** eyetracking: users treat photos of real people as
  content and scrutinise them; on a bio page users spent 10% more time on the
  portraits than on the bios, which occupied 316% more space.
  https://www.nngroup.com/articles/photos-as-web-content/
- **Lindgaard et al. 2006**: visual appeal is judged in ~50ms. Combined with the
  above, a hero portrait makes identity the first variable evaluated, before any
  work has been read.

### Country variation

- **US/Canada** — EEOC says employers should not request a photograph; pre-employment
  inquiries revealing protected characteristics can be evidence of discriminatory
  intent. Canada's PSC ran a name-blind recruitment pilot. Photo on a CV: no.
- **UK/Ireland** — standard CV carries no photo, no DOB, no marital status.
  Consensus, not law.
- **Germany** — the AGG (2006) means no employer can require a photo, but the
  *Bewerbungsfoto* survives at traditional employers. German legal commentary notes
  omitting it does not shield the employer, since ethnicity is inferable from name
  and place of birth anyway. §22 AGG shifts the burden of proof once an applicant
  shows indicia.
- **Netherlands / Nordics** — moving away from photos, but sourced only from career
  content marketing. Weak.

### The counter-argument, which is real

**Austria, ESR 2021** — where the photo is the norm, *omitting* it triggered
penalties, and **Asian applicants were specifically penalised for leaving it out**.
https://academic.oup.com/esr/article/37/6/867/6319847

**Fernández-Reino & Rovira, Oxford Review of Economic Policy 2024** — photo-omission
effects are not predictable; in the Netherlands, unveiled Turkish women did better
*including* the picture. Their conclusion: you cannot reliably anticipate an
employer's preference. https://academic.oup.com/oxrep/article/40/3/579/7907283

### Debunked

The viral **"88% of résumés with photos are auto-rejected"** has no traceable
primary source and recruiters dispute it. Zippia puts photo-driven rejection at
13%. The parallel "75% rejected by ATS" traces to a single 2012 vendor quote. Do
not use either figure. Roughly 24% of résumés carry a photo.

### Why include one at all

Two reasons, both arguable:
1. On a personal site the name and location are already disclosed, so the marginal
   group-membership information a photo adds is smaller than on a blind CV — though
   the SER study above shows it is not zero.
2. **Design.** He has no client logos, no testimonials, no case studies, no product
   screenshots. A face is the only real image asset he owns. Without it the page is
   type and colour alone — which is precisely the generic-AI-design failure mode.

---

## DATE OF BIRTH

**Recommendation: remove it from the site and from the résumé page. Replace with
"8 years" or "building software professionally since 2018."**

Carries every legitimate signal DOB carries, at none of the cost.

- **UK** — age is a protected characteristic under the Equality Act 2010. The TUC
  notes an employer having asked for DOB can form part of the evidence in a
  discrimination claim. Standard UK CVs omit it.
- **EU** — Directive 2000/78/EC prohibits direct and indirect age discrimination in
  access to employment.
- **US** — ADEA covers 40+. EEOC: the ADEA does not specifically prohibit asking for
  DOB, but "requests for age information will be closely scrutinized."

### A myth to not rely on

There is **no legal requirement anywhere that an employer must discard an
application containing a DOB.** This was searched for specifically and not found.
What exists is *voluntary* blind screening that strips DOB, photo, name and dates —
the German ADS pilot, Canada's PSC pilot, vendor-reported programmes at Deloitte,
IBM, HSBC. Accurate statement: employers may strip it, not that they must bin you.

### GDPR

Publishing your own DOB is not a breach by you — GDPR's protections run to the data
subject. *Lindqvist* (C-101/01) concerned publishing data about **other** people.
The practical consequence runs the other way: once published, data is arguably
"manifestly made public," which weakens your later position on minimisation and
erasure (the Art. 9(2)(e) threshold).

Separate and worth flagging: if the new site runs analytics or a contact form, he
becomes a controller for **visitors'** data. That is its own compliance question.

### Identity fraud

Cifas advises against sharing full DOB alongside address and contact details,
because name + DOB + address is what identity fraud needs. FTC-affiliated agencies
logged 1,358,253 identity-theft complaints in 2025, up 19.6%, $15.86bn in losses.
Name + DOB + city is the classic knowledge-based-authentication triple, and a
personal site normally supplies employer history and university for free.

### Counter-argument

Points-based immigration explicitly scores age — Canada's Express Entry CRS gives
maximum points at 20–29, decaying to zero at 45. Real, but it belongs in an
immigration file, not on a public website, and at 8 years' experience he is past
the cliff regardless.

### Third option, preserving the easter egg

The current site links his birthday to Wikipedia's "December 13" page. **Keep the
day, drop the year.** No year means no age signal and no KBA value, and the
whimsy survives intact.

---

## LOCATION

**Recommendation: state "Karachi, Pakistan," and pair it in the same breath with
the markets already served and the timezone overlap. Do not omit it.**

The country penalty is real, but it is **information-driven** — and supplying
information is exactly what a credibility site is for.

### The penalty

**Galperin & Greppi** — internal platform data, 81,497 bids, 18,356 job seekers,
5,262 jobs over 44 months. Controlling for bid amount, bid delay, country
reputation, prior relationship and productivity, foreign nationality reduced
winning odds by 2.2 points against a 5.3% base rate: **a ~42% hiring penalty**
(~58% unadjusted). Spanish employers paid a ~16% premium to hire domestically.

**The finding that matters:** the penalty stays essentially unchanged as controls
are added — *until individual reputation from prior work enters the model*, at which
point it drops. The authors conclude this is statistical discrimination from
information frictions, not taste-based dislike.
https://doi.org/10.2139/ssrn.2922874

**Agrawal, Horton, Lacetera & Lyons** — 424,308 applications, 14,733 jobs:
developed-country employers prefer developed-country workers, but standardised and
verified work-history information raises hiring likelihood and **disproportionately
benefits workers from less-developed countries.**
https://www.sciencedirect.com/science/article/abs/pii/S0022199616300903

Also: "liability of foreignness" on Upwork — foreign contractors get fewer
opportunities and lower pay for the same work, and some postings carry explicitly
exclusionary language **naming Pakistan and Bangladesh.**
https://journals.sagepub.com/doi/10.1177/20539517241232631

### Why omitting it fails

- Career-side consensus: omitting the address is itself a red flag, because
  including it is standard — employers assume you are circumventing a location
  requirement.
- Recruiter-side: "remote does not mean addressless." Recruiters hiring
  internationally screen for risk — will this person disappear, will communication
  break, is payment and compliance a headache. Address it before they ask.
- "Hiding your country until later in the application process" is named outright as
  a common mistake in remote-job guidance.
- It is undetectable-proof anyway: LinkedIn, GitHub commit timestamps, phone country
  code and the employer names on the résumé all give it away. Withholding buys
  nothing and costs credibility once discovered.

### The mechanism to exploit

Both Galperin and Agrawal show the country penalty collapses when **verified
individual experience** is present. So the line that defuses it delivers that
signal in the same breath as the country cue:

> Karachi, Pakistan. Eight years building for teams in the US, Europe and the
> Middle East.

Not a slogan — the research is explicit that vague versions supply no information
and therefore defuse nothing. Name the markets. He has them: US schools via
Scayle/LearnerPal, Middle East and Europe via Folio3, global enterprise via
Securiti.

Add timezone honestly: strong overlap with European working hours, a late-evening
window with the US East Coast. "Remote, worldwide" frequently means "4+ hours
overlap with the core team," so answer it rather than leaving it open.

### Visa signalling

Employers ask on the application form, not on your website. Consistent advice: do
**not** write "requires sponsorship" prominently — state what you have, not what you
need, and keep any such line low on the page, never in the header. One factual
sentence in an availability block is enough.

### Counter-argument, and why to accept the cost

**Pay anchoring.** Stating Karachi up front invites a location-adjusted offer and
gives a recruiter a cheap pre-read filter. Standard negotiation advice for
candidates in lower-cost areas is to delay location disclosure until the employer's
pay philosophy is known. This is a real cost. The recommendation is to accept it,
because the alternative is being filtered out later *with a credibility hit
attached*.

---

## What has no good evidence behind it

1. Photos on **personal websites** and hiring outcomes — nothing. All extrapolation.
2. Photo **placement** (hero vs inline vs footer) and hiring perception — nothing.
3. Whether recruiters **visit candidate personal sites** at all, how often, or what
   they look at first — no data found.
4. A field experiment isolating a **Pakistan-based applicant** applying to EU/US
   remote roles with location stated vs withheld. Closest proxies are freelance
   marketplaces, which are not salaried hiring.
5. Any **legal requirement to discard** an application containing a DOB.
6. Whether "location + markets served" **outperforms location alone** — pure
   inference from the statistical-discrimination mechanism.
7. The **"88% photo auto-rejection"** figure — no primary source, disputed.
8. **Netherlands/Nordics photo norms** — career content marketing only.
9. Whether **ATS parsers actually break on embedded photos** — repeated everywhere,
   sourced nowhere.
