
## TL;DR

Developed AI models that estimate a patient's age and judge impacted-tooth extraction difficulty from dental panoramic radiographs. The core finding, shown experimentally: **semi-supervised learning (SSL) can cut labeling cost while still reaching clinical-grade accuracy.**

The work was published as co-author in two international journals — **BMC Oral Health (2023)** and **DMFR (2023)**.

## Role

In a 4-person research team I **led data processing and model experimentation**. I designed and ran the LaplaceNet-based SSL performance experiments, and owned the paper figures and results write-up.

## Approach

### Age estimation from panoramic radiographs

Built supervised baselines on DenseNet and WideResNet — models that extract *age-band features* from panoramic images.

### SSL vs. SL comparison

Medical imaging carries a very high *expert labeling cost*, so the central question was whether clinical-grade accuracy is reachable *without* abundant labels.

I designed the **LaplaceNet-based SSL** experiments and compared them against supervised learning. The result demonstrated that SSL reaches supervised-level accuracy with *far fewer labels*.

### Heuristic grouping

Applying ±3-year heuristic grouping to age prediction *improved accuracy across every model*. That moves evaluation past a raw accuracy metric toward a *clinically meaningful prediction range*.

### Automated hyperparameter tuning

PyTorch implementations plus **grid search automated with Ray** — turning a sweep that would never finish by hand into managed infrastructure.

## Results

| Result | Detail |
|---|---|
| **SSL accuracy** | **80%+** — supervised-level accuracy with *far fewer labels* |
| **Journal publications** | **2** — BMC Oral Health (2023), DMFR (2023), as co-author |
| **Research contribution** | Led data processing, experiment design, and figure preparation |
| **Clinical relevance** | Heuristic grouping (±3 yrs) demonstrated a clinically usable accuracy range |

## Publications

1. **"Application of entire dental panorama image data in artificial intelligence model for age estimation"**
   _BMC Oral Health_, 2023-12-15 · [Springer Link](https://link.springer.com/article/10.1186/s12903-023-03745-x)

   WideResNet + DenseNet supervised learning with heuristic grouping (±3-year tolerance) improved prediction accuracy, showing that using the entire image outperforms prior approaches for age estimation.

2. **"The efficacy of supervised learning and semi-supervised learning in diagnosis of impacted third molar on panoramic radiographs through artificial intelligence model"**
   _DMFR_, 2023-05-16 · [DOI](https://doi.org/10.1259/dmfr.20230030)

   WideResNet (SL) vs. LaplaceNet (SSL) — SSL held comparable 80%+ accuracy using *only a small amount of labeled data*, making the case for SSL's practicality in medical image analysis.

## Stack

- **Framework**: PyTorch, Ray
- **Models**: DenseNet, WideResNet, LaplaceNet
- **Tools**: Python, Jupyter, Pandas, Matplotlib, Seaborn
