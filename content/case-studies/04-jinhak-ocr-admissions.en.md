
## TL;DR

Built an OCR-based deep-learning system that *automatically recognizes and structures* university admissions documents (application guidelines, student records). Designed both the models and the preprocessing logic to tolerate wildly varying formats, and took it through to a service-ready prototype.

**40% less input time than manual entry**, **contributed to one patent filing**.

## Role

In a 3-person task force I owned **deep-learning model development and the prototype**. I designed the text recognition and post-processing logic for scanned admissions documents, and joined the patent task force to support technical writing and planning.

## Approach

### OCR benchmarking & Korean-specialized model comparison

Guideline formats differ per university, and scanned student records mix tables with free text. I started with a comparison study of which model held up best in a Korean OCR setting.

### Preprocessing that absorbs format variety

Raw OCR output isn't directly usable precisely *because formats differ per school*. I built a post-processing layer — text normalization plus keyword extraction — that *absorbs those differences*.

### Region recognition for key fields

Designed a region-recognition structure for *structural fields* like admission unit, track name, and evaluation elements. Not plain text extraction — *understanding document structure*.

### Flask-based web prototype

I didn't stop at the model: I built the Flask web prototype myself and tested integration with the frontend, validating *how the model actually attaches to a service*.

### Patent task force

Participated in writing up the technical overview and implementation approach — experience in *protecting a deep-learning model as intellectual property*.

## Results

| Result | Detail |
|---|---|
| **Input time vs. manual** | **40% reduction** |
| **OCR preprocessing** | Normalization + keyword-extraction structure that handles varied formats |
| **Patent** | 1 filing contributed to (DL-based OCR system) |
| **Prototype** | Flask web demo, frontend integration tested |

## Stack

- **ML / OCR**: TensorFlow, Google Cloud Vision API
- **Backend**: Python, Flask
- **Frontend**: JavaScript
- **Collaboration**: GitHub, Figma, Notion, Dooray
