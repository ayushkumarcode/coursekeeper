import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'demo@coursekeeper.ai' },
    update: {},
    create: {
      email: 'demo@coursekeeper.ai',
      name: 'Demo User',
      createdAt: new Date(),
    },
  })

  console.log('👤 Created user:', user.email)

  // Create Computer Vision subject with 2008 baseline
  // First check if subject exists
  const existingSubject = await prisma.subject.findFirst({
    where: {
      userId: user.id,
      title: 'Computer Vision',
    },
  })

  const subject = existingSubject || await prisma.subject.create({
    data: {
      userId: user.id,
      title: 'Computer Vision',
      discipline: 'CS',
      baselineYear: 2008,
      description: 'Stanford CS231N - Computer Vision Course',
      createdAt: new Date(),
    },
  })

  console.log('📚 Created/found subject:', subject.title)

  // Clear existing data for this subject to avoid duplicates
  await prisma.baselineTopic.deleteMany({ where: { subjectId: subject.id } })
  await prisma.yearDiff.deleteMany({ 
    where: { 
      yearRun: { 
        subjectId: subject.id 
      } 
    } 
  })
  await prisma.yearRun.deleteMany({ where: { subjectId: subject.id } })

  // Create baseline topics from 2008
  const baselineTopics = [
    { name: 'Edge Detection (Sobel, Canny)', type: 'method', category: 'Feature Detection', importance: 9 },
    { name: 'SIFT (Scale-Invariant Feature Transform)', type: 'method', category: 'Feature Detection', importance: 10 },
    { name: 'HOG (Histogram of Oriented Gradients)', type: 'method', category: 'Feature Detection', importance: 9 },
    { name: 'Support Vector Machines', type: 'method', category: 'Machine Learning', importance: 8 },
    { name: 'Bag of Visual Words', type: 'concept', category: 'Recognition', importance: 7 },
    { name: 'Viola-Jones Face Detection', type: 'system', category: 'Object Detection', importance: 9 },
    { name: 'Optical Flow', type: 'concept', category: 'Motion Analysis', importance: 7 },
    { name: 'Camera Calibration', type: 'method', category: 'Geometry', importance: 8 },
    { name: 'Stereo Vision', type: 'concept', category: 'Geometry', importance: 7 },
    { name: 'Image Pyramids', type: 'concept', category: 'Multi-scale', importance: 6 },
  ]

  for (const topic of baselineTopics) {
    await prisma.baselineTopic.create({
      data: {
        subjectId: subject.id,
        name: topic.name,
        type: topic.type,
        category: topic.category,
        importance: topic.importance,
        summary: `Core ${topic.category} technique from classical computer vision`,
        createdAt: new Date(),
      },
    })
  }

  console.log('📝 Created', baselineTopics.length, 'baseline topics')

  // Create YearRuns with rich evolution data
  const yearData = [
    {
        year: 2012,
      summary: 'The Deep Learning Revolution Begins',
      description: 'AlexNet wins ImageNet by a massive margin, proving deep CNNs are superior to traditional methods',
      changes: [
        { type: 'ADD', title: 'Convolutional Neural Networks (CNNs)', rationale: 'AlexNet demonstrates CNNs vastly outperform traditional methods' },
        { type: 'ADD', title: 'ReLU Activation Functions', rationale: 'Replacing sigmoid/tanh for faster training' },
        { type: 'ADD', title: 'Dropout Regularization', rationale: 'Prevents overfitting in deep networks' },
        { type: 'DEPRECATE', title: 'Hand-crafted Features', rationale: 'CNNs learn features automatically from data' },
      ],
      papers: [
        { title: 'ImageNet Classification with Deep CNNs', authors: 'Krizhevsky et al.', url: 'https://papers.nips.cc/paper/4824', venue: 'NIPS 2012' },
      ],
      videos: [
        { title: 'How CNNs Work - AlexNet Explained', url: 'https://youtube.com/watch?v=example1', channel: 'Two Minute Papers' },
      ],
    },
    {
      year: 2014,
      summary: 'Going Deeper with Convolutions',
      description: 'VGGNet and GoogLeNet push the boundaries of network depth and introduce new architectures',
      changes: [
        { type: 'ADD', title: 'Very Deep Networks (VGG)', rationale: '16-19 layers with small 3x3 filters' },
        { type: 'ADD', title: 'Inception Modules', rationale: 'GoogLeNet introduces multi-scale processing in single layer' },
        { type: 'EMERGE', title: 'Transfer Learning', rationale: 'Pre-trained models become standard practice' },
      ],
      papers: [
        { title: 'Very Deep Convolutional Networks', authors: 'Simonyan & Zisserman', url: 'https://arxiv.org/abs/1409.1556', venue: 'ICLR 2015' },
        { title: 'Going Deeper with Convolutions', authors: 'Szegedy et al.', url: 'https://arxiv.org/abs/1409.4842', venue: 'CVPR 2015' },
      ],
      videos: [
        { title: 'VGG Architecture Explained', url: 'https://youtube.com/watch?v=example2', channel: 'DeepLearning.AI' },
      ],
    },
    {
      year: 2015,
      summary: 'The Residual Revolution',
      description: 'ResNet introduces skip connections, enabling training of networks with 100+ layers',
      changes: [
        { type: 'ADD', title: 'Residual Networks (ResNet)', rationale: 'Skip connections solve vanishing gradient problem' },
        { type: 'ADD', title: 'Batch Normalization', rationale: 'Stabilizes training of very deep networks' },
        { type: 'ADD', title: 'Faster R-CNN', rationale: 'Real-time object detection becomes practical' },
      ],
      papers: [
        { title: 'Deep Residual Learning', authors: 'He et al.', url: 'https://arxiv.org/abs/1512.03385', venue: 'CVPR 2016' },
        { title: 'Faster R-CNN', authors: 'Ren et al.', url: 'https://arxiv.org/abs/1506.01497', venue: 'NIPS 2015' },
      ],
      videos: [
        { title: 'ResNet Explained', url: 'https://youtube.com/watch?v=example3', channel: 'Yannic Kilcher' },
      ],
    },
    {
      year: 2017,
      summary: 'Attention is All You Need (Almost)',
      description: 'Transformers emerge in NLP but hint at future vision applications. GANs mature.',
      changes: [
        { type: 'ADD', title: 'Generative Adversarial Networks', rationale: 'High-quality image generation becomes possible' },
        { type: 'ADD', title: 'Feature Pyramid Networks', rationale: 'Multi-scale object detection improvement' },
        { type: 'EMERGE', title: 'Self-Attention Mechanisms', rationale: 'Transformers show promise beyond NLP' },
      ],
      papers: [
        { title: 'Attention Is All You Need', authors: 'Vaswani et al.', url: 'https://arxiv.org/abs/1706.03762', venue: 'NeurIPS 2017' },
        { title: 'Progressive Growing of GANs', authors: 'Karras et al.', url: 'https://arxiv.org/abs/1710.10196', venue: 'ICLR 2018' },
      ],
      videos: [
        { title: 'Transformer Architecture', url: 'https://youtube.com/watch?v=example4', channel: '3Blue1Brown' },
      ],
    },
    {
      year: 2020,
      summary: 'Vision Transformers Challenge CNN Dominance',
      description: 'ViT proves transformers can match/exceed CNNs on vision tasks. Self-supervised learning explodes.',
      changes: [
        { type: 'ADD', title: 'Vision Transformers (ViT)', rationale: 'Pure transformers achieve SOTA on ImageNet' },
        { type: 'ADD', title: 'Self-Supervised Learning', rationale: 'BYOL, SwAV enable training without labels' },
        { type: 'ADD', title: 'DETR Object Detection', rationale: 'End-to-end transformer-based detection' },
      ],
      papers: [
        { title: 'An Image is Worth 16x16 Words', authors: 'Dosovitskiy et al.', url: 'https://arxiv.org/abs/2010.11929', venue: 'ICLR 2021' },
        { title: 'End-to-End Object Detection with Transformers', authors: 'Carion et al.', url: 'https://arxiv.org/abs/2005.12872', venue: 'ECCV 2020' },
      ],
      videos: [
        { title: 'Vision Transformer Explained', url: 'https://youtube.com/watch?v=example5', channel: 'AI Coffee Break' },
      ],
    },
    {
      year: 2022,
      summary: 'Diffusion Models and CLIP Transform Generation',
      description: 'Stable Diffusion democratizes image generation. CLIP enables zero-shot vision-language tasks.',
      changes: [
        { type: 'ADD', title: 'Diffusion Models', rationale: 'Stable Diffusion enables high-quality text-to-image generation' },
        { type: 'ADD', title: 'CLIP Vision-Language Models', rationale: 'Zero-shot image classification via text' },
        { type: 'ADD', title: 'Masked Autoencoders (MAE)', rationale: 'Efficient self-supervised pre-training' },
      ],
      papers: [
        { title: 'High-Resolution Image Synthesis', authors: 'Rombach et al.', url: 'https://arxiv.org/abs/2112.10752', venue: 'CVPR 2022' },
        { title: 'Learning Transferable Visual Models', authors: 'Radford et al.', url: 'https://arxiv.org/abs/2103.00020', venue: 'ICML 2021' },
      ],
      videos: [
        { title: 'Stable Diffusion Explained', url: 'https://youtube.com/watch?v=example6', channel: 'Computerphile' },
      ],
    },
    {
      year: 2023,
      summary: 'Segment Anything and Foundation Models',
      description: 'SAM enables zero-shot segmentation. DINOv2 provides universal visual features.',
      changes: [
        { type: 'ADD', title: 'Segment Anything Model (SAM)', rationale: 'Zero-shot segmentation for any object' },
        { type: 'ADD', title: 'DINOv2 Self-Supervised ViT', rationale: 'Universal visual features without labels' },
        { type: 'ADD', title: 'ControlNet', rationale: 'Precise control over diffusion models' },
      ],
      papers: [
        { title: 'Segment Anything', authors: 'Kirillov et al.', url: 'https://arxiv.org/abs/2304.02643', venue: 'ICCV 2023' },
        { title: 'DINOv2: State-of-art Self-supervised', authors: 'Oquab et al.', url: 'https://arxiv.org/abs/2304.07193', venue: 'TMLR 2023' },
      ],
      videos: [
        { title: 'SAM: Segmenting Anything', url: 'https://youtube.com/watch?v=example7', channel: 'Meta AI' },
      ],
    },
    {
      year: 2024,
      summary: 'Multimodal AI and Real-time Vision',
      description: 'LLaVA, GPT-4V bring vision-language to the masses. Real-time video generation emerges.',
      changes: [
        { type: 'ADD', title: 'Multimodal Large Language Models', rationale: 'GPT-4V, Gemini combine vision and language' },
        { type: 'ADD', title: 'Real-time Video Generation', rationale: 'RunwayML, Pika enable instant video creation' },
        { type: 'EMERGE', title: 'Embodied AI Vision', rationale: 'Vision for robotics and autonomous systems' },
      ],
      papers: [
        { title: 'Visual Instruction Tuning', authors: 'Liu et al.', url: 'https://arxiv.org/abs/2304.08485', venue: 'NeurIPS 2023' },
        { title: 'Video Generation Models as Simulators', authors: 'Bruce et al.', url: 'https://arxiv.org/abs/2024.xxxxx', venue: 'CVPR 2024' },
      ],
      videos: [
        { title: 'GPT-4V Capabilities', url: 'https://youtube.com/watch?v=example8', channel: 'OpenAI' },
      ],
    },
  ]

  for (const data of yearData) {
    // Create YearRun
    const yearRun = await prisma.yearRun.create({
      data: {
        subjectId: subject.id,
        year: data.year,
        status: 'COMPLETED',
        createdAt: new Date(),
        completedAt: new Date(),
      },
    })

    // Create YearDiff for each change
    for (const change of data.changes) {
      await prisma.yearDiff.create({
        data: {
          runId: yearRun.id,
          changeType: change.type,
          fromTitle: change.type === 'DEPRECATE' ? change.title : null,
          toTitle: change.type !== 'DEPRECATE' ? change.title : null,
          rationale: change.rationale,
          confidence: 0.95,
          evidence: [],
          importance: 8,
        },
      })
    }

    // Create CanonItems for papers
    for (const paper of data.papers) {
      await prisma.canonItem.create({
        data: {
          discipline: 'CS',
          type: 'paper',
          title: paper.title,
          url: paper.url,
          venue: paper.venue,
          year: data.year,
          summary: `${paper.authors}: Groundbreaking research in computer vision`,
          confidence: 0.9 + Math.random() * 0.1,
          metadata: {
            authors: paper.authors,
            paperType: 'research',
          },
          createdAt: new Date(),
        },
      })
    }

    console.log(`📅 Created data for year ${data.year}`)
  }

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })