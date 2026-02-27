export interface Change {
  type: 'ADD' | 'DEPRECATE' | 'EMERGE' | 'RENAME'
  title: string
  rationale: string
}

export interface Paper {
  title: string
  authors: string
  url: string
  venue: string
}

export interface Video {
  title: string
  url: string
  channel: string
}

export interface YearData {
  year: number
  summary: string
  description: string
  changes: Change[]
  papers: Paper[]
  videos: Video[]
}

export const mockYearData: Record<number, YearData> = {
  2012: {
    year: 2012,
    summary: 'The Deep Learning Revolution Begins',
    description: 'AlexNet wins ImageNet by a massive margin, proving deep CNNs are superior to traditional computer vision methods. This marks the beginning of the deep learning era.',
    changes: [
      { type: 'ADD', title: 'Convolutional Neural Networks (CNNs)', rationale: 'AlexNet demonstrates CNNs vastly outperform traditional methods on ImageNet' },
      { type: 'ADD', title: 'ReLU Activation Functions', rationale: 'Replacing sigmoid/tanh for faster training and better gradients' },
      { type: 'ADD', title: 'Dropout Regularization', rationale: 'Prevents overfitting in deep networks by randomly dropping neurons' },
      { type: 'DEPRECATE', title: 'Hand-crafted Features (SIFT, HOG)', rationale: 'CNNs learn features automatically from data, making manual feature engineering obsolete' },
    ],
    papers: [
      { title: 'ImageNet Classification with Deep CNNs', authors: 'Krizhevsky, Sutskever, Hinton', url: 'https://papers.nips.cc/paper/4824', venue: 'NIPS 2012' },
      { title: 'Improving neural networks by preventing co-adaptation', authors: 'Hinton et al.', url: 'https://arxiv.org/abs/1207.0580', venue: 'arXiv 2012' },
    ],
    videos: [
      { title: 'How CNNs Work - AlexNet Explained', url: 'https://youtube.com/watch?v=example1', channel: 'Two Minute Papers' },
      { title: 'The Deep Learning Revolution', url: 'https://youtube.com/watch?v=example2', channel: 'Lex Fridman' },
    ],
  },
  2014: {
    year: 2014,
    summary: 'Going Deeper with Convolutions',
    description: 'VGGNet and GoogLeNet push the boundaries of network depth. VGG shows that simple architectures with small filters work well, while GoogLeNet introduces inception modules.',
    changes: [
      { type: 'ADD', title: 'Very Deep Networks (VGG)', rationale: '16-19 layers with small 3x3 filters throughout' },
      { type: 'ADD', title: 'Inception Modules', rationale: 'GoogLeNet introduces multi-scale processing in single layer' },
      { type: 'EMERGE', title: 'Transfer Learning', rationale: 'Pre-trained models become standard practice for new tasks' },
      { type: 'ADD', title: 'R-CNN for Object Detection', rationale: 'Region-based CNN brings deep learning to object detection' },
    ],
    papers: [
      { title: 'Very Deep Convolutional Networks', authors: 'Simonyan & Zisserman', url: 'https://arxiv.org/abs/1409.1556', venue: 'ICLR 2015' },
      { title: 'Going Deeper with Convolutions', authors: 'Szegedy et al.', url: 'https://arxiv.org/abs/1409.4842', venue: 'CVPR 2015' },
      { title: 'Rich feature hierarchies for object detection', authors: 'Girshick et al.', url: 'https://arxiv.org/abs/1311.2524', venue: 'CVPR 2014' },
    ],
    videos: [
      { title: 'VGG Architecture Explained', url: 'https://youtube.com/watch?v=example3', channel: 'DeepLearning.AI' },
      { title: 'GoogLeNet and Inception', url: 'https://youtube.com/watch?v=example4', channel: 'Stanford CS231n' },
    ],
  },
  2015: {
    year: 2015,
    summary: 'The Residual Revolution',
    description: 'ResNet introduces skip connections, enabling training of networks with 100+ layers. This solves the vanishing gradient problem and becomes the foundation for modern architectures.',
    changes: [
      { type: 'ADD', title: 'Residual Networks (ResNet)', rationale: 'Skip connections solve vanishing gradient problem in very deep networks' },
      { type: 'ADD', title: 'Batch Normalization', rationale: 'Stabilizes training and allows higher learning rates' },
      { type: 'ADD', title: 'Faster R-CNN', rationale: 'Real-time object detection becomes practical with RPN' },
      { type: 'EMERGE', title: 'Highway Networks', rationale: 'Alternative approach to training deep networks' },
    ],
    papers: [
      { title: 'Deep Residual Learning', authors: 'He, Zhang, Ren, Sun', url: 'https://arxiv.org/abs/1512.03385', venue: 'CVPR 2016' },
      { title: 'Batch Normalization', authors: 'Ioffe & Szegedy', url: 'https://arxiv.org/abs/1502.03167', venue: 'ICML 2015' },
      { title: 'Faster R-CNN', authors: 'Ren et al.', url: 'https://arxiv.org/abs/1506.01497', venue: 'NIPS 2015' },
    ],
    videos: [
      { title: 'ResNet Explained', url: 'https://youtube.com/watch?v=example5', channel: 'Yannic Kilcher' },
      { title: 'Why ResNets Work', url: 'https://youtube.com/watch?v=example6', channel: 'Andrew Ng' },
    ],
  },
  2017: {
    year: 2017,
    summary: 'Attention Mechanisms Emerge',
    description: 'While Transformers revolutionize NLP, computer vision sees improvements in GANs and feature pyramids. The seeds of vision transformers are planted.',
    changes: [
      { type: 'ADD', title: 'Feature Pyramid Networks', rationale: 'Multi-scale object detection improvement' },
      { type: 'ADD', title: 'Mask R-CNN', rationale: 'Instance segmentation becomes mainstream' },
      { type: 'EMERGE', title: 'Self-Attention in Vision', rationale: 'Early experiments with attention mechanisms in CV' },
      { type: 'ADD', title: 'MobileNets', rationale: 'Efficient CNNs for mobile devices' },
    ],
    papers: [
      { title: 'Attention Is All You Need', authors: 'Vaswani et al.', url: 'https://arxiv.org/abs/1706.03762', venue: 'NeurIPS 2017' },
      { title: 'Feature Pyramid Networks', authors: 'Lin et al.', url: 'https://arxiv.org/abs/1612.03144', venue: 'CVPR 2017' },
      { title: 'Mask R-CNN', authors: 'He et al.', url: 'https://arxiv.org/abs/1703.06870', venue: 'ICCV 2017' },
    ],
    videos: [
      { title: 'Transformer Architecture', url: 'https://youtube.com/watch?v=example7', channel: '3Blue1Brown' },
      { title: 'Instance Segmentation Explained', url: 'https://youtube.com/watch?v=example8', channel: 'Computer Vision Foundation' },
    ],
  },
  2020: {
    year: 2020,
    summary: 'Vision Transformers Challenge CNN Dominance',
    description: 'ViT proves transformers can match/exceed CNNs on vision tasks. Self-supervised learning methods like BYOL and SwAV enable training without labels.',
    changes: [
      { type: 'ADD', title: 'Vision Transformers (ViT)', rationale: 'Pure transformers achieve SOTA on ImageNet without convolutions' },
      { type: 'ADD', title: 'Self-Supervised Learning (BYOL, SwAV)', rationale: 'Training without labels reaches supervised performance' },
      { type: 'ADD', title: 'DETR Object Detection', rationale: 'End-to-end transformer-based detection without anchors' },
      { type: 'EMERGE', title: 'Contrastive Learning', rationale: 'SimCLR and MoCo show promise for unsupervised pre-training' },
    ],
    papers: [
      { title: 'An Image is Worth 16x16 Words', authors: 'Dosovitskiy et al.', url: 'https://arxiv.org/abs/2010.11929', venue: 'ICLR 2021' },
      { title: 'End-to-End Object Detection with Transformers', authors: 'Carion et al.', url: 'https://arxiv.org/abs/2005.12872', venue: 'ECCV 2020' },
      { title: 'Bootstrap Your Own Latent', authors: 'Grill et al.', url: 'https://arxiv.org/abs/2006.07733', venue: 'NeurIPS 2020' },
    ],
    videos: [
      { title: 'Vision Transformer Explained', url: 'https://youtube.com/watch?v=example9', channel: 'AI Coffee Break' },
      { title: 'DETR: A New Era in Object Detection', url: 'https://youtube.com/watch?v=example10', channel: 'Facebook AI' },
    ],
  },
  2022: {
    year: 2022,
    summary: 'Diffusion Models and CLIP Transform Generation',
    description: 'Stable Diffusion democratizes image generation. CLIP enables zero-shot vision-language tasks. The era of generative AI and multimodal models begins.',
    changes: [
      { type: 'ADD', title: 'Diffusion Models (Stable Diffusion)', rationale: 'High-quality text-to-image generation becomes accessible' },
      { type: 'ADD', title: 'CLIP Vision-Language Models', rationale: 'Zero-shot image classification via text prompts' },
      { type: 'ADD', title: 'Masked Autoencoders (MAE)', rationale: 'Efficient self-supervised pre-training by masking patches' },
      { type: 'DEPRECATE', title: 'Traditional GANs', rationale: 'Diffusion models prove more stable and controllable' },
    ],
    papers: [
      { title: 'High-Resolution Image Synthesis with Latent Diffusion', authors: 'Rombach et al.', url: 'https://arxiv.org/abs/2112.10752', venue: 'CVPR 2022' },
      { title: 'Learning Transferable Visual Models From Natural Language', authors: 'Radford et al.', url: 'https://arxiv.org/abs/2103.00020', venue: 'ICML 2021' },
      { title: 'Masked Autoencoders Are Scalable Vision Learners', authors: 'He et al.', url: 'https://arxiv.org/abs/2111.06377', venue: 'CVPR 2022' },
    ],
    videos: [
      { title: 'Stable Diffusion Explained', url: 'https://youtube.com/watch?v=example11', channel: 'Computerphile' },
      { title: 'CLIP: Connecting Text and Images', url: 'https://youtube.com/watch?v=example12', channel: 'OpenAI' },
    ],
  },
  2023: {
    year: 2023,
    summary: 'Segment Anything and Foundation Models',
    description: 'SAM enables zero-shot segmentation of any object. DINOv2 provides universal visual features. Foundation models become the new paradigm.',
    changes: [
      { type: 'ADD', title: 'Segment Anything Model (SAM)', rationale: 'Zero-shot segmentation for any object with prompts' },
      { type: 'ADD', title: 'DINOv2 Self-Supervised ViT', rationale: 'Universal visual features without any labels' },
      { type: 'ADD', title: 'ControlNet', rationale: 'Precise control over diffusion model outputs' },
      { type: 'EMERGE', title: 'Multimodal Foundation Models', rationale: 'Large models that understand vision, language, and more' },
    ],
    papers: [
      { title: 'Segment Anything', authors: 'Kirillov et al.', url: 'https://arxiv.org/abs/2304.02643', venue: 'ICCV 2023' },
      { title: 'DINOv2: Learning Robust Visual Features without Supervision', authors: 'Oquab et al.', url: 'https://arxiv.org/abs/2304.07193', venue: 'TMLR 2023' },
      { title: 'Adding Conditional Control to Text-to-Image Diffusion Models', authors: 'Zhang et al.', url: 'https://arxiv.org/abs/2302.05543', venue: 'ICCV 2023' },
    ],
    videos: [
      { title: 'SAM: Segmenting Anything', url: 'https://youtube.com/watch?v=example13', channel: 'Meta AI' },
      { title: 'Foundation Models in Computer Vision', url: 'https://youtube.com/watch?v=example14', channel: 'Stanford HAI' },
    ],
  },
  2024: {
    year: 2024,
    summary: 'Multimodal AI and Real-time Vision',
    description: 'GPT-4V and Gemini bring vision to large language models. Real-time video generation becomes possible. Computer vision is now deeply integrated with language understanding.',
    changes: [
      { type: 'ADD', title: 'Multimodal Large Language Models', rationale: 'GPT-4V, Gemini, and Claude can see and understand images' },
      { type: 'ADD', title: 'Real-time Video Generation', rationale: 'RunwayML and Pika enable instant video creation from text' },
      { type: 'EMERGE', title: 'Embodied AI Vision', rationale: 'Vision for robotics and autonomous systems advances rapidly' },
      { type: 'ADD', title: 'Efficient Vision Models', rationale: 'Models like EfficientViT run on edge devices' },
    ],
    papers: [
      { title: 'Visual Instruction Tuning', authors: 'Liu et al.', url: 'https://arxiv.org/abs/2304.08485', venue: 'NeurIPS 2023' },
      { title: 'GPT-4 Technical Report', authors: 'OpenAI', url: 'https://arxiv.org/abs/2303.08774', venue: 'arXiv 2023' },
      { title: 'Gemini: A Family of Highly Capable Multimodal Models', authors: 'Google', url: 'https://arxiv.org/abs/2312.11805', venue: 'arXiv 2024' },
    ],
    videos: [
      { title: 'GPT-4V Capabilities Demo', url: 'https://youtube.com/watch?v=example15', channel: 'OpenAI' },
      { title: 'The Future of Computer Vision', url: 'https://youtube.com/watch?v=example16', channel: 'CVPR 2024' },
    ],
  },
}

// Fill in missing years with basic data
for (let year = 2009; year <= 2024; year++) {
  if (!mockYearData[year]) {
    mockYearData[year] = {
      year,
      summary: `Incremental improvements in computer vision`,
      description: `Various improvements in existing techniques and optimization methods.`,
      changes: [
        { type: 'ADD', title: `New optimization technique`, rationale: 'Improved training efficiency' },
        { type: 'EMERGE', title: `Experimental approach`, rationale: 'Shows promise for future development' },
      ],
      papers: [
        { title: `Computer Vision Research ${year}`, authors: 'Various', url: '#', venue: `CVPR ${year}` },
      ],
      videos: [
        { title: `Year ${year} in Review`, url: '#', channel: 'AI Research' },
      ],
    }
  }
}
