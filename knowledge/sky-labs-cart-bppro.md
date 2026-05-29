# Sky Labs CART B.P.Pro — Reference Document

## Company
- Name: Sky Labs Inc.
- Country: South Korea
- Product: CART B.P.Pro — ring-form cuffless blood pressure monitor

## Device Specifications
- Measurement technology: PPG (photoplethysmography) + AI deep learning
- Form factor: Ring (worn on finger)
- Measurement mode: Continuous 24-hour blood pressure monitoring
- No cuff required

## Regulatory Certifications
- CE IIb (European Medical Device Regulation) — Class IIb medical device
- MHRA certified (United Kingdom)
- Korean Ministry of Food and Drug Safety (MFDS) approved
- ISO 81060-2:2018 validated: average error ≤5 mmHg, standard deviation ≤8 mmHg (compared to 24-hour ambulatory BP monitor)

## Clinical Evidence
- First ring-type blood pressure monitor included in official Korean hypertension clinical guidelines (2026)
- Presented at APSC (Asia Pacific Society of Cardiology) 2026
- 250,000+ prescriptions issued in Korea since June 2024
- Used in 1,920 hospitals and clinics in Korea including advanced general hospitals
- Korean National Health Insurance coverage: June 2024

## Charité Berlin Connection
- Research relationship established: 2018 (LOI signed)
- Relevant for LockIN's German clinical pathway

## Research Papers
- Full list: https://www.skylabs.io/paper

## Relevance to LockIN
- PRIMARY BP device for LockIN's DiGA plan (replaced the retired Huawei Watch D2)
- Continuous 24h cuffless BP — richer data than any intermittent wrist cuff
- ISO 81060-2:2018 validation satisfies BfArM AbEM measurement specification requirements
- CE-MDR (Jan 2026) status provides clinical credibility for BfArM DiGA submission
- Potential integration: Android Health Connect / iOS HealthKit or direct Bluetooth LE

## Why Huawei Watch D2 Was Dropped
- BP sensor is locked to third-party apps (Wear Engine does not expose BP); no compliant data path
- Huawei is subject to China's National Intelligence Law — fails BSI / DiGA data-protection trust regardless of where data is stored
- Conclusion: ruled out for DiGA. Sky Labs ring is the replacement BP device.

## DiGA Data Residency — §4 DiGAV (verified)
- Rule: patient data may only be processed in Germany, EU/EEA, Switzerland, or a country with an EU adequacy decision (GDPR Art. 45). Standard Contractual Clauses (SCCs) are NOT permitted for DiGA — must be true adequacy.
- South Korea HAS full EU adequacy: Commission Implementing Decision (EU) 2022/254, in force since 17 Dec 2021, no sunset clause. So Korea (and Sky Labs as a Korean company) is NOT automatically blocked.
- Source (binding): https://eur-lex.europa.eu/eli/dec_impl/2022/254/oj/eng
- Source (Commission list): https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en
- Source (BfArM, §4 DiGAV): https://www.bfarm.de/SharedDocs/Downloads/EN/MedicalDevices/Data_Processing_outside_of_Germany_FAQ.pdf?__blob=publicationFile&v=3

## The Real Blocker — BSI C5 (technical, separate from legal adequacy)
- Legal adequacy (§4 DiGAV) and technical server certification (BSI C5) are TWO DIFFERENT bars.
- Korea passes the legal bar (adequacy). But Sky Labs' Korean servers are NOT BSI C5 certified — that fails the technical bar (BSI TR-03161).
- Their AWS Frankfurt infrastructure CAN qualify for BSI C5.
- Ask to Sky Labs: commit to EU-only processing on BSI C5-certified servers (AWS Frankfurt), no re-transfer to Korea.

## Integration Architecture — Raw PPG Is the Key Question
- PATH A (preferred): SDK exposes raw PPG → inference runs ON-DEVICE (phone) → BP number → no patient data leaves the device. Full data sovereignty. Lets LockIN run Sky Labs' compiled model (.mlpackage / .tflite) or, eventually, its own model.
- PATH B (fallback): SDK exposes only the processed BP number from Sky Labs' server. This is how the product works today for all current users (Omron distribution, Otsuka Japan). Works only if EU-only BSI C5 processing is contractually guaranteed.
- The single most important question for the first Sky Labs call: "Does the SDK expose raw PPG, or only the processed BP output?"

## First Partnership Call — Three Questions That Decide Everything
1. Does the SDK expose raw PPG, or only the processed BP number?
2. Will Sky Labs commit to EU-only processing on BSI C5 servers (no Korea re-transfer)?
3. Is HealthKit / Health Connect export on their roadmap? (avoids MDR Art. 22 system-pack issue)

## What LockIN Offers Sky Labs (partnership value)
- German DiGA statutory-reimbursement channel — every prescription = a paid ring sale (recurring). Omron distributes but gives no reimbursement play.
- Free EU clinical validation via LockIN's RCT — reusable evidence for all their future EU partners.
- Software / intervention / correlation layer that drives patient retention = more device sales.
- EU regulatory pathway (BSI / DiGA / MDR) cracked for their ring in the largest EU market.
