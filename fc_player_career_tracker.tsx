import React, { useState, useEffect, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { 
  Trophy, User, Activity, BarChart3, Settings, Plus, Minus, Download, Upload, 
  Star, Clock, ChevronRight, ChevronDown, CheckCircle2, Shield, Users, ArrowRightLeft, 
  Trash2, Award, Zap, AlertCircle, X, Globe, Sliders, Layers
} from 'lucide-react';

const TRANSLATIONS = {
  zh: {
    appName: "FC 生涯数据追踪",
    dashboard: "概览",
    compare: "多球员对比",
    addMatch: "录入比赛",
    history: "履历",
    settings: "球员管理",
    switchLang: "English",
    ovrLabel: "综合评分 (OVR)",
    subStatsDetail: "详细细分数值 (Attributes)",
    radarTitle: "六维雷达模型",
    careerKPI: "生涯核心指标",
    matchesPlayed: "出场次数",
    avgRating: "平均评分",
    totalGoals: "总进球",
    totalAssists: "总助攻",
    weakFoot: "逆足",
    skillMoves: "花式",
    ovrTrajectory: "OVR 演变路线",
    compareTitle: "多球员深度横向对比",
    selectComparePlayers: "选择对比球员 (可多选 2-4 人)",
    matrixTitle: "核心数值对决矩阵",
    logMatchTitle: "录入单场比赛日志",
    matchDate: "比赛日期",
    opponent: "对手俱乐部",
    minutes: "出场分钟",
    goals: "进球数",
    assists: "助攻数",
    starter: "首发出战",
    rating: "赛后表现评分",
    notes: "比赛复盘评语",
    statAdjust: "能力细项调校 (加减分)",
    submitMatch: "提交比赛并同步能力值",
    playerDatabase: "球员档案库",
    newPlayer: "新增球员",
    editProfile: "编辑球员基本信息",
    name: "姓名",
    position: "主要位置",
    age: "年龄",
    nationality: "国籍",
    club: "效力俱乐部",
    updateProfile: "保存基本信息",
    exportImport: "生涯数据备份与迁移",
    exportData: "导出 JSON 备份",
    importData: "导入恢复数据",
    currentFocus: "当前焦点",
    cancel: "取消",
    confirmCreate: "确认创建",
    subStatsToggle: "展开/收起 细分各项数值",
    bestStat: "最高项",
    // Categories
    PAC: "速度 (PAC)",
    SHO: "射门 (SHO)",
    PAS: "传球 (PAS)",
    DRI: "盘带 (DRI)",
    DEF: "防守 (DEF)",
    PHY: "力量/体能 (PHY)",
    // Sub-stats
    acceleration: "加速 (Acceleration)",
    sprintSpeed: "冲刺速度 (Sprint Speed)",
    positioning: "进攻跑位 (Positioning)",
    finishing: "射门 (Finishing)",
    shotPower: "射门力量 (Shot Power)",
    longShots: "远射 (Long Shots)",
    volleys: "凌空抽射 (Volleys)",
    penalties: "点球 (Penalties)",
    vision: "视野 (Vision)",
    crossing: "传中 (Crossing)",
    fkAccuracy: "任意球 (FK Accuracy)",
    shortPassing: "短传 (Short Passing)",
    longPassing: "长传 (Long Passing)",
    curve: "弧线 (Curve)",
    agility: "敏捷 (Agility)",
    balance: "平衡 (Balance)",
    reactions: "反应 (Reactions)",
    ballControl: "控球 (Ball Control)",
    dribbling: "盘带 (Dribbling)",
    composure: "冷静 (Composure)",
    interceptions: "拦截 (Interceptions)",
    headingAccuracy: "头球精度 (Heading Acc)",
    defAwareness: "防守意识 (Def Awareness)",
    standTackle: "抢断 (Stand Tackle)",
    slideTackle: "铲球 (Slide Tackle)",
    jumping: "弹跳 (Jumping)",
    stamina: "体能 (Stamina)",
    strength: "力量 (Strength)",
    aggression: "侵略性 (Aggression)"
  },
  en: {
    appName: "FC CAREER TRACKER",
    dashboard: "Dashboard",
    compare: "Multi-Compare",
    addMatch: "Log Match",
    history: "History",
    settings: "Manager",
    switchLang: "中文",
    ovrLabel: "Overall (OVR)",
    subStatsDetail: "Detailed Attributes",
    radarTitle: "Attribute Radar",
    careerKPI: "Career KPIs",
    matchesPlayed: "Matches",
    avgRating: "Avg Rating",
    totalGoals: "Goals",
    totalAssists: "Assists",
    weakFoot: "Weak Foot",
    skillMoves: "Skill Moves",
    ovrTrajectory: "OVR Trajectory",
    compareTitle: "Multi-Player Head-to-Head Comparison",
    selectComparePlayers: "Select Players to Compare (2-4 Players)",
    matrixTitle: "Attribute Comparison Matrix",
    logMatchTitle: "Log Single Match Report",
    matchDate: "Match Date",
    opponent: "Opponent",
    minutes: "Minutes",
    goals: "Goals",
    assists: "Assists",
    starter: "Starter",
    rating: "Match Rating",
    notes: "Match Notes & Review",
    statAdjust: "Attribute Delta Adjustments",
    submitMatch: "Save Match & Update Stats",
    playerDatabase: "Player Database",
    newPlayer: "Add Player",
    editProfile: "Edit Player Profile",
    name: "Name",
    position: "Position",
    age: "Age",
    nationality: "Nationality",
    club: "Club",
    updateProfile: "Update Profile",
    exportImport: "Backup & Migration",
    exportData: "Export JSON",
    importData: "Import JSON",
    currentFocus: "Active",
    cancel: "Cancel",
    confirmCreate: "Create Player",
    subStatsToggle: "Toggle Sub-Attributes",
    bestStat: "Best",
    // Categories
    PAC: "Pace (PAC)",
    SHO: "Shooting (SHO)",
    PAS: "Passing (PAS)",
    DRI: "Dribbling (DRI)",
    DEF: "Defending (DEF)",
    PHY: "Physicality (PHY)",
    // Sub-stats
    acceleration: "Acceleration",
    sprintSpeed: "Sprint Speed",
    positioning: "Att. Positioning",
    finishing: "Finishing",
    shotPower: "Shot Power",
    longShots: "Long Shots",
    volleys: "Volleys",
    penalties: "Penalties",
    vision: "Vision",
    crossing: "Crossing",
    fkAccuracy: "FK Accuracy",
    shortPassing: "Short Passing",
    longPassing: "Long Passing",
    curve: "Curve",
    agility: "Agility",
    balance: "Balance",
    reactions: "Reactions",
    ballControl: "Ball Control",
    dribbling: "Dribbling",
    composure: "Composure",
    interceptions: "Interceptions",
    headingAccuracy: "Heading Accuracy",
    defAwareness: "Def. Awareness",
    standTackle: "Standing Tackle",
    slideTackle: "Sliding Tackle",
    jumping: "Jumping",
    stamina: "Stamina",
    strength: "Strength",
    aggression: "Aggression"
  }
};

const SUB_STATS_STRUCTURE = {
  PAC: ['acceleration', 'sprintSpeed'],
  SHO: ['positioning', 'finishing', 'shotPower', 'longShots', 'volleys', 'penalties'],
  PAS: ['vision', 'crossing', 'fkAccuracy', 'shortPassing', 'longPassing', 'curve'],
  DRI: ['agility', 'balance', 'reactions', 'ballControl', 'dribbling', 'composure'],
  DEF: ['interceptions', 'headingAccuracy', 'defAwareness', 'standTackle', 'slideTackle'],
  PHY: ['jumping', 'stamina', 'strength', 'aggression']
};

const DEFAULT_SUB_STATS_ALEX = {
  acceleration: 88, sprintSpeed: 84,
  positioning: 85, finishing: 84, shotPower: 83, longShots: 78, volleys: 75, penalties: 76,
  vision: 76, crossing: 72, fkAccuracy: 68, shortPassing: 78, longPassing: 70, curve: 74,
  agility: 86, balance: 82, reactions: 84, ballControl: 85, dribbling: 86, composure: 80,
  interceptions: 35, headingAccuracy: 65, defAwareness: 36, standTackle: 38, slideTackle: 32,
  jumping: 76, stamina: 82, strength: 72, aggression: 68
};

const DEFAULT_SUB_STATS_MATEO = {
  acceleration: 80, sprintSpeed: 76,
  positioning: 82, finishing: 78, shotPower: 80, longShots: 84, volleys: 79, penalties: 80,
  vision: 92, crossing: 86, fkAccuracy: 88, shortPassing: 90, longPassing: 87, curve: 89,
  agility: 88, balance: 85, reactions: 86, ballControl: 90, dribbling: 88, composure: 89,
  interceptions: 54, headingAccuracy: 48, defAwareness: 52, standTackle: 53, slideTackle: 48,
  jumping: 62, stamina: 78, strength: 64, aggression: 58
};

const DEFAULT_SUB_STATS_LUCAS = {
  acceleration: 78, sprintSpeed: 82,
  positioning: 60, finishing: 52, shotPower: 70, longShots: 65, volleys: 50, penalties: 55,
  vision: 72, crossing: 70, fkAccuracy: 60, shortPassing: 78, longPassing: 76, curve: 68,
  agility: 75, balance: 74, reactions: 82, ballControl: 76, dribbling: 74, composure: 80,
  interceptions: 88, headingAccuracy: 86, defAwareness: 87, standTackle: 89, slideTackle: 85,
  jumping: 84, stamina: 88, strength: 86, aggression: 85
};

const calculateCategoryStats = (subStats) => {
  if (!subStats) return { PAC: 70, SHO: 70, PAS: 70, DRI: 70, DEF: 70, PHY: 70 };
  const categories = {};
  Object.keys(SUB_STATS_STRUCTURE).forEach(cat => {
    const keys = SUB_STATS_STRUCTURE[cat];
    const sum = keys.reduce((acc, k) => acc + (subStats[k] || 70), 0);
    categories[cat] = Math.round(sum / keys.length);
  });
  return categories;
};

const calculateOVR = (subStats) => {
  const mainStats = calculateCategoryStats(subStats);
  const avg = (mainStats.PAC + mainStats.SHO + mainStats.PAS + mainStats.DRI + mainStats.DEF + mainStats.PHY) / 6;
  return Math.round(avg) + 2;
};

const getRatingColor = (rating) => {
  if (rating >= 8.5) return 'text-emerald-400';
  if (rating >= 7.0) return 'text-amber-400';
  if (rating >= 6.0) return 'text-yellow-400';
  return 'text-rose-400';
};

const getStatColor = (val) => {
  if (val >= 90) return 'text-emerald-400 font-black';
  if (val >= 80) return 'text-amber-400 font-extrabold';
  if (val >= 70) return 'text-yellow-400 font-bold';
  return 'text-neutral-400';
};

const COMPARE_COLORS = ['#f59e0b', '#06b6d4', '#ec4899', '#10b981'];

const DEFAULT_PLAYERS = [
  {
    id: 'player_1',
    profile: {
      name: "Alex Hunter",
      position: "ST",
      nationality: "England",
      club: "Real Madrid",
      age: 19,
      weakFoot: 4,
      skillMoves: 4,
      traits: ["Finesse Shot", "Speed Dribbler", "Outside Foot Shot"]
    },
    subStats: DEFAULT_SUB_STATS_ALEX,
    matches: [
      { id: 'm1', date: '2026-08-15', opponent: 'Sevilla', minutes: 90, isStarter: true, goals: 2, assists: 1, yellow: 0, red: 0, rating: 8.8, notes: '揭幕战上演梅开二度！', subChanges: { acceleration: 1, sprintSpeed: 1, finishing: 2, shotPower: 1, dribbling: 1 } },
      { id: 'm2', date: '2026-08-22', opponent: 'Atletico Madrid', minutes: 85, isStarter: true, goals: 1, assists: 0, yellow: 1, red: 0, rating: 7.6, notes: '德比战强硬突破抢分。', subChanges: { acceleration: 1, positioning: 1, stamina: 1 } }
    ]
  },
  {
    id: 'player_2',
    profile: {
      name: "Mateo Silva",
      position: "CAM",
      nationality: "Portugal",
      club: "FC Barcelona",
      age: 20,
      weakFoot: 5,
      skillMoves: 5,
      traits: ["Playmaker", "Technical Dribbler", "Long Passer"]
    },
    subStats: DEFAULT_SUB_STATS_MATEO,
    matches: [
      { id: 'm1_p2', date: '2026-08-18', opponent: 'Valencia', minutes: 90, isStarter: true, goals: 0, assists: 3, yellow: 0, red: 0, rating: 9.1, notes: '中场大师级的传球调度，助攻帽子戏法。', subChanges: { vision: 2, shortPassing: 2, longPassing: 1, ballControl: 1 } }
    ]
  },
  {
    id: 'player_3',
    profile: {
      name: "Lucas Hernandez",
      position: "CB",
      nationality: "France",
      club: "Bayern Munich",
      age: 21,
      weakFoot: 3,
      skillMoves: 2,
      traits: ["Power Header", "Slide Tackler"]
    },
    subStats: DEFAULT_SUB_STATS_LUCAS,
    matches: [
      { id: 'm1_p3', date: '2026-08-20', opponent: 'Dortmund', minutes: 90, isStarter: true, goals: 0, assists: 0, yellow: 0, red: 0, rating: 8.2, notes: '防线铁闸，多次关门拦截。', subChanges: { interceptions: 2, standTackle: 1, headingAccuracy: 1 } }
    ]
  }
];

export default function App() {
  const [lang, setLang] = useState('zh');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState(null);

  const t = (key) => TRANSLATIONS[lang][key] || key;

  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('fc_career_players_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return DEFAULT_PLAYERS;
  });

  const [activePlayerId, setActivePlayerId] = useState(() => players[0]?.id || 'player_1');
  const [selectedCompareIds, setSelectedCompareIds] = useState(() => {
    return players.slice(0, 3).map(p => p.id);
  });

  useEffect(() => {
    localStorage.setItem('fc_career_players_v2', JSON.stringify(players));
  }, [players]);

  const showToast = (msg, type = 'info') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const activePlayer = useMemo(() => {
    return players.find(p => p.id === activePlayerId) || players[0];
  }, [players, activePlayerId]);

  const getGrowthData = (player) => {
    if (!player) return [];
    let baseSub = { ...player.subStats };
    
    player.matches.slice().reverse().forEach(m => {
      Object.keys(m.subChanges || {}).forEach(k => {
        baseSub[k] = (baseSub[k] || 70) - (m.subChanges[k] || 0);
      });
    });

    const data = [{ name: lang === 'zh' ? '初始' : 'Init', OVR: calculateOVR(baseSub), ...calculateCategoryStats(baseSub) }];
    let runningSub = { ...baseSub };

    player.matches.forEach((m, idx) => {
      Object.keys(m.subChanges || {}).forEach(k => {
        runningSub[k] = (runningSub[k] || 70) + (m.subChanges[k] || 0);
      });
      data.push({
        name: `M${idx + 1}`,
        OVR: calculateOVR(runningSub),
        ...calculateCategoryStats(runningSub)
      });
    });
    return data;
  };

  const handleAddNewPlayer = (newProfile) => {
    const newPlayer = {
      id: `player_${Date.now()}`,
      profile: newProfile,
      subStats: { ...DEFAULT_SUB_STATS_ALEX },
      matches: []
    };
    setPlayers(prev => [...prev, newPlayer]);
    setActivePlayerId(newPlayer.id);
    if (selectedCompareIds.length < 4) {
      setSelectedCompareIds(prev => [...prev, newPlayer.id]);
    }
    showToast(`${t('playerDatabase')} + ${newProfile.name}`, 'success');
  };

  const handleDeletePlayer = (id) => {
    if (players.length <= 1) {
      showToast(lang === 'zh' ? '至少需要保留一名球员档案' : 'At least 1 player required', 'warning');
      return;
    }
    const filtered = players.filter(p => p.id !== id);
    setPlayers(filtered);
    if (activePlayerId === id) setActivePlayerId(filtered[0].id);
    setSelectedCompareIds(prev => prev.filter(cId => cId !== id));
    showToast(lang === 'zh' ? '已移除该球员档案' : 'Player removed', 'info');
  };

  const handleUpdatePlayerProfile = (updatedProfile) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === activePlayer.id) return { ...p, profile: updatedProfile };
      return p;
    }));
    showToast(t('updateProfile'), 'success');
  };

  const handleAddMatch = (matchData, updatedSubStats) => {
    setPlayers(prev => prev.map(p => {
      if (p.id === activePlayer.id) {
        return {
          ...p,
          subStats: updatedSubStats,
          matches: [...p.matches, matchData]
        };
      }
      return p;
    }));
    showToast(lang === 'zh' ? '比赛记录已保存，数值已更新！' : 'Match logged & attributes updated!', 'success');
    setActiveTab('history');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(players, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FC_Career_Detailed_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t('exportData'), 'success');
  };

  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported) && imported.length > 0) {
          setPlayers(imported);
          setActivePlayerId(imported[0].id);
          setSelectedCompareIds(imported.slice(0, 3).map(p => p.id));
          showToast('Data imported successfully!', 'success');
        }
      } catch (err) {
        showToast('JSON parse error', 'warning');
      }
    };
    reader.readAsText(file);
  };

  const renderNav = () => (
    <nav className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-amber-500/20 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-amber-500" />
            <span className="text-lg md:text-xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 tracking-wider">
              {t('appName')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switch Button */}
            <button 
              onClick={() => setLang(l => l === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-bold text-amber-400 hover:border-amber-500/50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('switchLang')}</span>
            </button>

            {/* Player Switcher */}
            <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1">
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <select 
                value={activePlayerId} 
                onChange={(e) => setActivePlayerId(e.target.value)}
                className="bg-transparent text-xs font-bold text-amber-100 focus:outline-none cursor-pointer max-w-[130px] truncate"
              >
                {players.map(p => (
                  <option key={p.id} value={p.id} className="bg-neutral-900 text-white">
                    {p.profile.name} ({p.profile.position} - {calculateOVR(p.subStats)})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-around w-full md:w-auto gap-1 md:gap-2">
          {[
            { id: 'dashboard', icon: Trophy, label: t('dashboard') },
            { id: 'compare', icon: ArrowRightLeft, label: t('compare') },
            { id: 'add_match', icon: Plus, label: t('addMatch') },
            { id: 'history', icon: Activity, label: t('history') },
            { id: 'settings', icon: Settings, label: t('settings') }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all ${
                activeTab === item.id 
                  ? 'text-black bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/20' 
                  : 'text-neutral-400 hover:text-amber-200 hover:bg-neutral-900'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 font-sans pb-16 selection:bg-amber-500/30">
      {renderNav()}

      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md animate-in fade-in slide-in-from-top-2 bg-neutral-900/90 border-amber-500/40 text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-bold">{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-neutral-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        {activeTab === 'dashboard' && (
          <Dashboard 
            player={activePlayer}
            growthData={getGrowthData(activePlayer)}
            t={t}
            lang={lang}
          />
        )}

        {activeTab === 'compare' && (
          <MultiCompareView 
            players={players}
            selectedIds={selectedCompareIds}
            setSelectedIds={setSelectedCompareIds}
            getGrowthData={getGrowthData}
            t={t}
            lang={lang}
          />
        )}
        
        {activeTab === 'add_match' && (
          <MatchForm 
            player={activePlayer}
            onSave={handleAddMatch}
            t={t}
          />
        )}
        
        {activeTab === 'history' && (
          <MatchHistory player={activePlayer} t={t} />
        )}
        
        {activeTab === 'settings' && (
          <PlayerManager 
            players={players}
            activePlayer={activePlayer}
            setActivePlayerId={setActivePlayerId}
            onAddNewPlayer={handleAddNewPlayer}
            onDeletePlayer={handleDeletePlayer}
            onUpdateProfile={handleUpdatePlayerProfile}
            onExport={handleExportData}
            onImport={handleImportData}
            t={t}
          />
        )}
      </main>
    </div>
  );
}

function Dashboard({ player, growthData, t, lang }) {
  const [showSubDetails, setShowSubDetails] = useState(false);
  const { profile, subStats, matches } = player;
  const mainStats = calculateCategoryStats(subStats);
  const ovr = calculateOVR(subStats);

  const radarData = Object.keys(SUB_STATS_STRUCTURE).map(cat => ({
    subject: cat,
    A: mainStats[cat],
    fullMark: 99
  }));

  const totalGoals = matches.reduce((sum, m) => sum + (m.goals || 0), 0);
  const totalAssists = matches.reduce((sum, m) => sum + (m.assists || 0), 0);
  const avgRating = matches.length > 0 
    ? (matches.reduce((sum, m) => sum + (m.rating || 0), 0) / matches.length).toFixed(1) 
    : '-';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* FUT Card */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center gap-3">
          <FutCard profile={profile} mainStats={mainStats} ovr={ovr} />
          
          <button 
            onClick={() => setShowSubDetails(!showSubDetails)}
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-300 transition-all w-full justify-center shadow-md"
          >
            <Sliders className="w-4 h-4 text-amber-500" />
            <span>{t('subStatsToggle')}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSubDetails ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Attributes Radar & Quick Stats */}
        <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-5 flex flex-col items-center justify-center relative">
             <div className="absolute top-4 left-5 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t('radarTitle')}</span>
             </div>
             <div className="w-full h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData}>
                    <PolarGrid stroke="#262626" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#d4d4d4', fontSize: 12, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 99]} tick={false} axisLine={false} />
                    <Radar name={profile.name} dataKey="A" stroke="#f59e0b" strokeWidth={2} fill="#f59e0b" fillOpacity={0.4} />
                  </RadarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-5 flex flex-col justify-between">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" /> {t('careerKPI')}
            </span>
            <div className="grid grid-cols-2 gap-3">
              <StatBox icon={Activity} label={t('matchesPlayed')} value={matches.length} />
              <StatBox icon={Star} label={t('avgRating')} value={avgRating} color="text-amber-400" />
              <StatBox icon={Trophy} label={t('totalGoals')} value={totalGoals} color="text-emerald-400" />
              <StatBox icon={Award} label={t('totalAssists')} value={totalAssists} color="text-cyan-400" />
            </div>
            
            <div className="mt-5 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 font-bold uppercase">{t('weakFoot')}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={`wf-${i}`} className={`w-3.5 h-3.5 ${i < profile.weakFoot ? 'fill-amber-400 text-amber-400' : 'text-neutral-800'}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-neutral-500 font-bold uppercase">{t('skillMoves')}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={`sm-${i}`} className={`w-3.5 h-3.5 ${i < profile.skillMoves ? 'fill-amber-400 text-amber-400' : 'text-neutral-800'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Sub-Attributes Accordion Breakdown */}
      {showSubDetails && (
        <div className="bg-neutral-900/80 rounded-2xl border border-amber-500/30 p-6 space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4" /> {t('subStatsDetail')}
            </h3>
            <span className="text-xs text-neutral-500">{profile.name} - 29 {t('subStatsDetail')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(SUB_STATS_STRUCTURE).map(catKey => {
              const subKeys = SUB_STATS_STRUCTURE[catKey];
              return (
                <div key={catKey} className="bg-neutral-950/80 rounded-xl p-4 border border-neutral-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-neutral-800/80 pb-2">
                    <span className="font-black text-amber-400 text-xs">{t(catKey)}</span>
                    <span className={`text-sm ${getStatColor(mainStats[catKey])}`}>{mainStats[catKey]}</span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {subKeys.map(subKey => (
                      <div key={subKey} className="flex justify-between items-center text-xs">
                        <span className="text-neutral-400 font-bold">{t(subKey)}</span>
                        <span className={getStatColor(subStats[subKey] || 70)}>{subStats[subKey] || 70}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* OVR Growth Line Chart */}
      <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-widest flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-amber-500" />
            {t('ovrTrajectory')}
          </h3>
          <span className="text-xs text-amber-400 font-bold">OVR: {ovr}</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="name" stroke="#525252" tick={{fill: '#a3a3a3', fontSize: 12}} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#525252" tick={{fill: '#a3a3a3'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', borderRadius: '12px' }}
                itemStyle={{ color: '#fbbf24', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="OVR" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, fill: '#09090b', stroke: '#f59e0b', strokeWidth: 2}} activeDot={{r: 7}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function FutCard({ profile, mainStats, ovr, cardColor = 'amber' }) {
  const borderGradient = cardColor === 'cyan' 
    ? 'from-cyan-400 via-blue-500 to-indigo-700 shadow-cyan-500/20' 
    : cardColor === 'pink'
    ? 'from-pink-400 via-rose-500 to-purple-700 shadow-pink-500/20'
    : cardColor === 'emerald'
    ? 'from-emerald-400 via-teal-500 to-emerald-800 shadow-emerald-500/20'
    : 'from-amber-200 via-yellow-500 to-amber-700 shadow-amber-500/20';

  const posColor = cardColor === 'cyan' ? 'text-cyan-400' : 'text-amber-400';

  return (
    <div className={`relative w-64 h-96 rounded-2xl p-1 bg-gradient-to-br ${borderGradient} shadow-2xl hover:scale-[1.02] transition-transform duration-300`}>
      <div className="w-full h-full bg-[#141416] rounded-[14px] p-4 flex flex-col relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-start z-10 relative">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-black text-white leading-none tracking-tighter">{ovr}</span>
            <span className={`text-sm font-black ${posColor} uppercase`}>{profile.position}</span>
          </div>
          <div className="flex flex-col items-center gap-1 mt-1">
            <div className="w-8 h-5 bg-neutral-800 border border-neutral-700 rounded overflow-hidden flex items-center justify-center text-[9px] font-bold text-neutral-300">
              {profile.nationality ? profile.nationality.slice(0, 3).toUpperCase() : 'NAT'}
            </div>
            <div className="text-[9px] font-extrabold text-neutral-400 max-w-[60px] truncate text-center">
              {profile.club || 'FREE'}
            </div>
          </div>
        </div>

        {/* Player Silhouette Icon */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-44 h-44 opacity-20">
          <svg viewBox="0 0 200 200" className="w-full h-full text-neutral-200">
            <path fill="currentColor" d="M100 100c22.091 0 40-17.909 40-40s-17.909-40-40-40-40 17.909-40 40 17.909 40 40 40zm0 20c-26.667 0-80 13.333-80 40v20h160v-20c0-26.667-53.333-40-80-40z" />
          </svg>
        </div>

        {/* Bottom Stats */}
        <div className="mt-auto z-10 relative">
          <div className="text-center border-b border-neutral-800 pb-2 mb-2">
            <h2 className="text-lg font-black uppercase tracking-wider text-neutral-100 truncate">{profile.name}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs font-bold">
            {['PAC', 'DRI', 'SHO', 'DEF', 'PAS', 'PHY'].map((statKey) => (
              <div key={statKey} className="flex justify-between items-center">
                <span className="text-neutral-500">{statKey}</span>
                <span className={getStatColor(mainStats[statKey])}>{mainStats[statKey]}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function MultiCompareView({ players, selectedIds, setSelectedIds, getGrowthData, t, lang }) {
  const selectedPlayers = useMemo(() => {
    return players.filter(p => selectedIds.includes(p.id));
  }, [players, selectedIds]);

  const toggleSelectPlayer = (id) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 2) return; // Keep at least 2 for comparison
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length >= 4) return; // Limit to max 4
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Multi-radar chart data overlay
  const radarData = Object.keys(SUB_STATS_STRUCTURE).map(catKey => {
    const item = { subject: catKey };
    selectedPlayers.forEach((p, idx) => {
      item[`p_${p.id}`] = calculateCategoryStats(p.subStats)[catKey];
    });
    return item;
  });

  // Multi-line growth overlay
  const growthSeries = selectedPlayers.map(p => {
    return { player: p, data: getGrowthData(p) };
  });

  const maxLen = Math.max(...growthSeries.map(s => s.data.length), 0);
  const mergedGrowth = Array.from({ length: maxLen }).map((_, i) => {
    const row = { name: `M${i}` };
    selectedPlayers.forEach(p => {
      const gData = getGrowthData(p);
      row[p.profile.name] = gData[i] ? gData[i].OVR : null;
    });
    return row;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Player Selector Bar */}
      <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            {t('compareTitle')}
          </h2>
          <span className="text-xs text-neutral-400">{t('selectComparePlayers')}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {players.map(p => {
            const isSelected = selectedIds.includes(p.id);
            const colorIdx = selectedPlayers.findIndex(sp => sp.id === p.id);
            const badgeColor = isSelected ? COMPARE_COLORS[colorIdx % COMPARE_COLORS.length] : null;

            return (
              <button
                key={p.id}
                onClick={() => toggleSelectPlayer(p.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isSelected 
                    ? 'bg-neutral-800 text-white border-amber-500 shadow-md' 
                    : 'bg-neutral-950/60 text-neutral-400 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div 
                  className="w-3 h-3 rounded-full border border-neutral-700" 
                  style={{ backgroundColor: badgeColor || '#404040' }} 
                />
                <span>{p.profile.name}</span>
                <span className="text-[10px] text-amber-400">({p.profile.position} OVR {calculateOVR(p.subStats)})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-side FUT Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
        {selectedPlayers.map((p, idx) => {
          const mainStats = calculateCategoryStats(p.subStats);
          const ovr = calculateOVR(p.subStats);
          const colors = ['amber', 'cyan', 'pink', 'emerald'];

          return (
            <div key={p.id} className="flex flex-col items-center space-y-2">
              <span className="text-xs font-bold" style={{ color: COMPARE_COLORS[idx % COMPARE_COLORS.length] }}>
                ● {p.profile.name}
              </span>
              <FutCard profile={p.profile} mainStats={mainStats} ovr={ovr} cardColor={colors[idx % colors.length]} />
            </div>
          );
        })}
      </div>

      {/* Overlaid Radar Chart for 2+ Players */}
      <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t('radarTitle')}</h3>
          <div className="flex flex-wrap gap-4 text-xs font-bold">
            {selectedPlayers.map((p, idx) => (
              <span key={p.id} style={{ color: COMPARE_COLORS[idx % COMPARE_COLORS.length] }}>
                ● {p.profile.name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#262626" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#d4d4d4', fontSize: 12, fontWeight: 'bold' }} />
              <PolarRadiusAxis angle={30} domain={[0, 99]} tick={false} axisLine={false} />
              {selectedPlayers.map((p, idx) => (
                <Radar 
                  key={p.id} 
                  name={p.profile.name} 
                  dataKey={`p_${p.id}`} 
                  stroke={COMPARE_COLORS[idx % COMPARE_COLORS.length]} 
                  strokeWidth={2} 
                  fill={COMPARE_COLORS[idx % COMPARE_COLORS.length]} 
                  fillOpacity={0.25} 
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Multi-Player Attribute Comparison Table */}
      <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-6 space-y-4">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">{t('matrixTitle')}</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400">
                <th className="py-2 px-3 uppercase">{t('subStatsDetail')}</th>
                {selectedPlayers.map((p, idx) => (
                  <th key={p.id} className="py-2 px-3 font-black" style={{ color: COMPARE_COLORS[idx % COMPARE_COLORS.length] }}>
                    {p.profile.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              
              {/* OVR Row */}
              <tr className="bg-neutral-950/80 font-black">
                <td className="py-2.5 px-3 text-amber-400">{t('ovrLabel')}</td>
                {selectedPlayers.map(p => (
                  <td key={p.id} className="py-2.5 px-3 text-base text-amber-300">
                    {calculateOVR(p.subStats)}
                  </td>
                ))}
              </tr>

              {/* Main Categories & Sub-stats */}
              {Object.keys(SUB_STATS_STRUCTURE).map(catKey => {
                const subKeys = SUB_STATS_STRUCTURE[catKey];
                return (
                  <React.Fragment key={catKey}>
                    <tr className="bg-neutral-900/90 font-bold text-amber-400/90">
                      <td colSpan={selectedPlayers.length + 1} className="py-2 px-3 text-[11px] uppercase tracking-wider">
                        {t(catKey)}
                      </td>
                    </tr>

                    {subKeys.map(subKey => {
                      const vals = selectedPlayers.map(p => p.subStats[subKey] || 70);
                      const maxVal = Math.max(...vals);

                      return (
                        <tr key={subKey} className="hover:bg-neutral-950/40">
                          <td className="py-2 px-3 text-neutral-400">{t(subKey)}</td>
                          {selectedPlayers.map(p => {
                            const val = p.subStats[subKey] || 70;
                            const isBest = val === maxVal && selectedPlayers.length > 1;

                            return (
                              <td key={p.id} className={`py-2 px-3 font-bold ${isBest ? 'text-emerald-400 font-extrabold' : 'text-neutral-300'}`}>
                                {val} {isBest && '★'}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}

            </tbody>
          </table>
        </div>
      </div>

      {/* Multi-Player Growth Timeline */}
      <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-6">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">{t('ovrTrajectory')}</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mergedGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
              <XAxis dataKey="name" stroke="#525252" tick={{fill: '#a3a3a3'}} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#525252" tick={{fill: '#a3a3a3'}} />
              <Tooltip contentStyle={{ backgroundColor: '#171717', borderColor: '#404040', borderRadius: '12px' }} />
              <Legend />
              {selectedPlayers.map((p, idx) => (
                <Line 
                  key={p.id} 
                  type="monotone" 
                  dataKey={p.profile.name} 
                  stroke={COMPARE_COLORS[idx % COMPARE_COLORS.length]} 
                  strokeWidth={3} 
                  connectNulls 
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

function MatchForm({ player, onSave, t }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    opponent: '',
    minutes: 90,
    isStarter: true,
    goals: 0,
    assists: 0,
    rating: 7.0,
    notes: ''
  });

  const [activeCategory, setActiveCategory] = useState('PAC');
  const [subChanges, setSubChanges] = useState({});

  const handleSubChange = (subKey, delta) => {
    setSubChanges(prev => ({
      ...prev,
      [subKey]: (prev[subKey] || 0) + delta
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.opponent.trim()) return;

    const matchData = {
      id: `m_${Date.now()}`,
      ...formData,
      rating: parseFloat(formData.rating),
      subChanges
    };

    const updatedSubStats = { ...player.subStats };
    Object.keys(subChanges).forEach(k => {
      updatedSubStats[k] = Math.min(99, Math.max(1, (updatedSubStats[k] || 70) + subChanges[k]));
    });

    onSave(matchData, updatedSubStats);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-800 p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Plus className="text-amber-500" />
            {t('logMatchTitle')} - <span className="text-amber-400">{player.profile.name}</span>
          </h2>
          <span className="text-xs text-neutral-500 font-bold">OVR: {calculateOVR(player.subStats)}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Match Basic Stats */}
          <div className="space-y-4">
            <h3 className="text-amber-500 font-bold uppercase text-xs tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> 基本信息
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-neutral-400 font-bold block mb-1">{t('matchDate')}</label>
                <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs focus:border-amber-500 text-white" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 font-bold block mb-1">{t('opponent')}</label>
                <input type="text" placeholder="e.g. Real Madrid" value={formData.opponent} onChange={e => setFormData({...formData, opponent: e.target.value})} required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs focus:border-amber-500 text-white" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-neutral-400 font-bold block mb-1">{t('minutes')}</label>
                <input type="number" min="0" max="120" value={formData.minutes} onChange={e => setFormData({...formData, minutes: parseInt(e.target.value) || 0})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs focus:border-amber-500 text-white" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 font-bold block mb-1">{t('goals')}</label>
                <input type="number" min="0" value={formData.goals} onChange={e => setFormData({...formData, goals: parseInt(e.target.value) || 0})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs focus:border-amber-500 text-white" />
              </div>
              <div>
                <label className="text-xs text-neutral-400 font-bold block mb-1">{t('assists')}</label>
                <input type="number" min="0" value={formData.assists} onChange={e => setFormData({...formData, assists: parseInt(e.target.value) || 0})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs focus:border-amber-500 text-white" />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.isStarter} onChange={e => setFormData({...formData, isStarter: e.target.checked})} className="w-4 h-4 rounded text-amber-500 bg-neutral-950 border-neutral-800" />
                <span className="text-xs font-bold text-neutral-300">{t('starter')}</span>
              </label>
            </div>

            <div className="space-y-2 pt-3 border-t border-neutral-800">
              <div className="flex justify-between items-center">
                <label className="text-xs text-neutral-300 font-bold">{t('rating')}</label>
                <span className={`font-black text-base ${getRatingColor(formData.rating)}`}>{formData.rating}</span>
              </div>
              <input 
                type="range" min="1.0" max="10.0" step="0.1" 
                value={formData.rating} 
                onChange={e => setFormData({...formData, rating: e.target.value})} 
                className="w-full accent-amber-500"
              />
            </div>
            
            <div>
              <label className="text-xs text-neutral-400 font-bold block mb-1">{t('notes')}</label>
              <textarea 
                rows="3" 
                placeholder="Match review..."
                value={formData.notes} 
                onChange={e => setFormData({...formData, notes: e.target.value})} 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs focus:border-amber-500 resize-none text-white" 
              />
            </div>

          </div>

          {/* Detailed Sub-Attribute Modifier */}
          <div className="space-y-4 bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80">
            <h3 className="text-amber-500 font-bold uppercase text-xs tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Sliders className="w-4 h-4" /> {t('statAdjust')}</span>
            </h3>

            {/* Sub Category Selector */}
            <div className="grid grid-cols-3 gap-1">
              {Object.keys(SUB_STATS_STRUCTURE).map(catKey => (
                <button
                  key={catKey}
                  type="button"
                  onClick={() => setActiveCategory(catKey)}
                  className={`py-1.5 px-2 text-xs font-black rounded-lg border transition-all ${
                    activeCategory === catKey
                      ? 'bg-amber-500 text-black border-amber-400'
                      : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                  }`}
                >
                  {catKey}
                </button>
              ))}
            </div>

            {/* Detailed Sub-stats Stepper Controls */}
            <div className="grid gap-2 pt-2">
              {SUB_STATS_STRUCTURE[activeCategory].map(subKey => {
                const currentVal = player.subStats[subKey] || 70;
                const changeVal = subChanges[subKey] || 0;
                const nextVal = currentVal + changeVal;

                return (
                  <div key={subKey} className="flex items-center justify-between p-2.5 bg-neutral-900 rounded-lg border border-neutral-800">
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-neutral-200">{t(subKey)}</span>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                        <span>{currentVal}</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className={`font-black ${changeVal > 0 ? 'text-emerald-400' : changeVal < 0 ? 'text-rose-400' : 'text-neutral-300'}`}>
                          {nextVal}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-neutral-950 rounded p-1 border border-neutral-800">
                      <button type="button" onClick={() => handleSubChange(subKey, -1)} className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-rose-400">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className={`w-6 text-center font-bold text-xs ${changeVal > 0 ? 'text-emerald-400' : changeVal < 0 ? 'text-rose-400' : 'text-neutral-600'}`}>
                        {changeVal > 0 ? `+${changeVal}` : changeVal}
                      </span>
                      <button type="button" onClick={() => handleSubChange(subKey, 1)} className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-emerald-400">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button type="submit" className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black px-8 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            {t('submitMatch')}
          </button>
        </div>
      </div>
    </form>
  );
}

function MatchHistory({ player, t }) {
  const { matches } = player;

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-neutral-500 space-y-3">
        <Activity className="w-12 h-12 opacity-30" />
        <p className="text-base font-bold">暂无比赛记录</p>
      </div>
    );
  }

  const sortedMatches = [...matches].reverse();

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Clock className="text-amber-500" />
          {t('history')} - <span className="text-amber-400">{player.profile.name}</span>
        </h2>
        <span className="text-xs text-neutral-400">{matches.length} Records</span>
      </div>
      
      <div className="grid gap-3">
        {sortedMatches.map((match) => {
          const subChangedKeys = Object.keys(match.subChanges || {}).filter(k => match.subChanges[k] !== 0);

          return (
            <div key={match.id} className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-base border ${match.rating >= 7.5 ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/50' : 'bg-neutral-800 text-neutral-300 border-neutral-700'}`}>
                    {match.rating.toFixed(1)}
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-neutral-100 flex items-center gap-2">
                      vs {match.opponent}
                      {!match.isStarter && <span className="text-[9px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-bold uppercase">Sub</span>}
                    </h4>
                    <span className="text-[11px] text-neutral-500">{match.date} | {match.minutes} mins</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-neutral-950/60 px-3 py-1.5 rounded-lg border border-neutral-800/60">
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-neutral-500 uppercase">{t('goals')}</div>
                    <div className="font-black text-emerald-400 text-xs">{match.goals}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[9px] font-bold text-neutral-500 uppercase">{t('assists')}</div>
                    <div className="font-black text-cyan-400 text-xs">{match.assists}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 justify-end max-w-xs">
                  {subChangedKeys.length > 0 ? subChangedKeys.map(k => (
                    <span key={k} className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${match.subChanges[k] > 0 ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/30' : 'bg-rose-950/50 text-rose-400 border border-rose-900/30'}`}>
                      {t(k)} {match.subChanges[k] > 0 ? '+' : ''}{match.subChanges[k]}
                    </span>
                  )) : <span className="text-[10px] text-neutral-600 font-bold">无属性改变</span>}
                </div>
              </div>

              {match.notes && (
                <p className="text-xs text-neutral-400 italic pt-2 border-t border-neutral-800/50">
                  "{match.notes}"
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlayerManager({ players, activePlayer, setActivePlayerId, onAddNewPlayer, onDeletePlayer, onUpdateProfile, onExport, onImport, t }) {
  const [profileForm, setProfileForm] = useState(activePlayer.profile);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerPos, setNewPlayerPos] = useState('ST');

  useEffect(() => {
    setProfileForm(activePlayer.profile);
  }, [activePlayer]);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
  };

  const handleCreateNew = (e) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;
    onAddNewPlayer({
      name: newPlayerName.trim(),
      position: newPlayerPos,
      nationality: "Global",
      club: "Free Agent",
      age: 18,
      weakFoot: 3,
      skillMoves: 3,
      traits: ["Young Prospect"]
    });
    setNewPlayerName('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Player Database Grid */}
      <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Users className="text-amber-500" /> {t('playerDatabase')} ({players.length})
          </h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-black px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
          >
            <Plus className="w-4 h-4" /> {t('newPlayer')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {players.map(p => {
            const isActive = p.id === activePlayer.id;
            return (
              <div 
                key={p.id}
                onClick={() => setActivePlayerId(p.id)}
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-md' 
                    : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="font-black text-sm text-neutral-100 flex items-center gap-2">
                    {p.profile.name}
                    <span className="text-[10px] text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded">{p.profile.position}</span>
                  </div>
                  <div className="text-xs text-neutral-500 mt-1">
                    OVR: {calculateOVR(p.subStats)} | {p.matches.length} Matches
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isActive && <span className="text-[10px] font-bold text-amber-400 uppercase">{t('currentFocus')}</span>}
                  {players.length > 1 && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); onDeletePlayer(p.id); }}
                      className="p-1 text-neutral-600 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleProfileSubmit} className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-6 space-y-4">
        <h3 className="text-sm font-bold text-neutral-300 uppercase tracking-widest border-b border-neutral-800 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-amber-500" /> {t('editProfile')}: {activePlayer.profile.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-neutral-400 font-bold block mb-1">{t('name')}</label>
            <input type="text" value={profileForm.name} onChange={e => setProfileForm({...profileForm, name: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-500" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-neutral-400 font-bold block mb-1">{t('position')}</label>
              <input type="text" value={profileForm.position} onChange={e => setProfileForm({...profileForm, position: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-500" />
            </div>
            <div>
              <label className="text-xs text-neutral-400 font-bold block mb-1">{t('age')}</label>
              <input type="number" value={profileForm.age} onChange={e => setProfileForm({...profileForm, age: parseInt(e.target.value) || 18})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-500" />
            </div>
          </div>
          <div>
            <label className="text-xs text-neutral-400 font-bold block mb-1">{t('nationality')}</label>
            <input type="text" value={profileForm.nationality} onChange={e => setProfileForm({...profileForm, nationality: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-500" />
          </div>
          <div>
            <label className="text-xs text-neutral-400 font-bold block mb-1">{t('club')}</label>
            <input type="text" value={profileForm.club} onChange={e => setProfileForm({...profileForm, club: e.target.value})} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-500" />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-6 py-2 rounded-lg text-xs transition-colors">
            {t('updateProfile')}
          </button>
        </div>
      </form>

      {/* Backup & Data Migration */}
      <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800/80 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-neutral-200">{t('exportImport')}</h4>
          <p className="text-xs text-neutral-500">Backup or restore player profiles with detailed attributes.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={onExport} className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl font-bold text-xs border border-neutral-700">
            <Download className="w-3.5 h-3.5" /> {t('exportData')}
          </button>
          
          <label className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl font-bold text-xs border border-neutral-700 cursor-pointer">
            <Upload className="w-3.5 h-3.5" /> {t('importData')}
            <input type="file" accept=".json" onChange={onImport} className="hidden" />
          </label>
        </div>
      </div>

      {/* New Player Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md space-y-4">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-3">
              <h3 className="text-base font-black text-white">{t('newPlayer')}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-neutral-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNew} className="space-y-4">
              <div>
                <label className="text-xs text-neutral-400 font-bold block mb-1">{t('name')}</label>
                <input 
                  type="text" 
                  placeholder="e.g. Kylian Mbappé" 
                  value={newPlayerName} 
                  onChange={e => setNewPlayerName(e.target.value)}
                  required 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:border-amber-500" 
                />
              </div>

              <div>
                <label className="text-xs text-neutral-400 font-bold block mb-1">{t('position')}</label>
                <select 
                  value={newPlayerPos} 
                  onChange={e => setNewPlayerPos(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-200 focus:border-amber-500"
                >
                  {['ST', 'CF', 'LW', 'RW', 'CAM', 'CM', 'CDM', 'CB', 'LB', 'RB', 'GK'].map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-neutral-400 hover:bg-neutral-800"
                >
                  {t('cancel')}
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg text-xs font-extrabold"
                >
                  {t('confirmCreate')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function StatBox({ icon: Icon, label, value, color = "text-neutral-100" }) {
  return (
    <div className="bg-neutral-950/60 rounded-xl p-3 flex items-center gap-3 border border-neutral-800/50">
      <div className={`p-2 rounded-lg bg-neutral-900 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[10px] text-neutral-500 font-bold uppercase">{label}</div>
        <div className={`text-lg font-black ${color}`}>{value}</div>
      </div>
    </div>
  );
}