/**
 * mock-recognition.js — Mock artifact photo recognition for scan.html
 */

(function() {
  'use strict';

  const MOCK_RESULTS = [
    {
      id: 'houmuwu_ding',
      name_zh: '后母戊鼎',
      dynasty: '商', period: '商代晚期',
      form_subtype: '方鼎',
      rarity_level: '国宝',
      confidence: 97,
      current_museum: '中国国家博物馆',
      patterns: ['饕餮纹', '夔龙纹', '云雷纹'],
      size: { height_cm: 133, weight_kg: 832.84 },
    },
    {
      id: 'siyang_fang_zun',
      name_zh: '四羊方尊',
      dynasty: '商', period: '商代晚期',
      form_subtype: '方尊',
      rarity_level: '国宝',
      confidence: 94,
      current_museum: '中国国家博物馆',
      patterns: ['饕餮纹', '夔龙纹', '凤鸟纹'],
      size: { height_cm: 58.3, weight_kg: 34.5 },
    },
    {
      id: 'fuhao_owl_zun',
      name_zh: '妇好鸮尊',
      dynasty: '商', period: '商代晚期',
      form_subtype: '鸮尊',
      rarity_level: '国宝',
      confidence: 91,
      current_museum: '河南博物院',
      patterns: ['饕餮纹', '云雷纹'],
      size: { height_cm: 45.9, weight_kg: 16.7 },
    },
    {
      id: 'he_zun',
      name_zh: '何尊',
      dynasty: '西周', period: '西周早期',
      form_subtype: '尊',
      rarity_level: '国宝',
      confidence: 89,
      current_museum: '宝鸡青铜器博物院',
      patterns: ['饕餮纹', '云雷纹'],
      size: { height_cm: 38.8, weight_kg: 14.6 },
    },
    {
      id: 'yuewang_goujian_jian',
      name_zh: '越王勾践剑',
      dynasty: '春秋', period: '春秋晚期',
      form_subtype: '剑',
      rarity_level: '国宝',
      confidence: 96,
      current_museum: '湖北省博物馆',
      patterns: ['菱形暗纹', '鸟篆铭文'],
      size: { height_cm: 55.7, weight_kg: 0.875 },
    },
  ];

  let _currentStep = 0;
  let _selectedResult = null;
  let _uploadedFile = null;

  function getRandomResult() {
    return MOCK_RESULTS[Math.floor(Math.random() * MOCK_RESULTS.length)];
  }

  function simulateRecognition(file, onProgress, onResult) {
    _uploadedFile = file;
    _currentStep = 0;

    const steps = [
      { delay: 400,  progress: 15, message: '正在分析图像特征...' },
      { delay: 800,  progress: 35, message: '提取器型轮廓...' },
      { delay: 600,  progress: 55, message: '识别纹饰类型...' },
      { delay: 700,  progress: 75, message: '比对数据库 277 件...' },
      { delay: 500,  progress: 90, message: '确认断代与馆藏...' },
      { delay: 400,  progress: 100, message: '识别完成' },
    ];

    let elapsed = 0;
    steps.forEach((step, i) => {
      elapsed += step.delay;
      setTimeout(() => {
        onProgress && onProgress(step.progress, step.message, i);
        if (i === steps.length - 1) {
          const result = getRandomResult();
          _selectedResult = result;
          onResult && onResult(result);
        }
      }, elapsed);
    });
  }

  window.MockRecognition = {
    simulate: simulateRecognition,
    results: MOCK_RESULTS,
    getById: (id) => MOCK_RESULTS.find(r => r.id === id),
  };
})();
