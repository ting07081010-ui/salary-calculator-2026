/**
 * 系統首頁
 * 提供各功能頁面連結與完整操作說明
 */
import React from 'react';
import {
    Calculator, Target, Settings, Users, TrendingUp,
    FileSpreadsheet, Download, Printer, RefreshCw,
    ChevronRight, Sparkles
} from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <header className="home-hero">
                <div className="home-hero-glow" />
                <div className="home-hero-content">
                    <div className="home-logo">
                        <Sparkles className="home-logo-icon" />
                    </div>
                    <h1 className="home-title">薪資試算系統 2026</h1>
                    <p className="home-subtitle">
                        完整的教育機構財務管理解決方案
                    </p>
                    <div className="home-version">Enterprise Edition v3.5</div>
                </div>
            </header>

            {/* Navigation Cards */}
            <main className="home-main">
                <section className="home-nav-section">
                    <h2 className="home-section-title">功能模組</h2>

                    <div className="home-nav-grid">
                        {/* Salary Calculator */}
                        <a href="?salary" className="home-nav-card card-blue hover-float">
                            <div className="home-nav-icon">
                                <Calculator />
                            </div>
                            <div className="home-nav-content">
                                <h3>薪資計算器</h3>
                                <p>計算正職/PT老師的月薪、獎金與時薪。支援多班級配置與分享連結。</p>
                            </div>
                            <ChevronRight className="home-nav-arrow" />
                        </a>

                        {/* Boss Dashboard */}
                        <a href="?boss" className="home-nav-card card-indigo hover-float">
                            <div className="home-nav-icon">
                                <Target />
                            </div>
                            <div className="home-nav-content">
                                <h3>Boss 損益儀表板</h3>
                                <p>老闆視角的財務分析。管理多位師資、班級配置與營運成本，即時計算淨利。</p>
                            </div>
                            <ChevronRight className="home-nav-arrow" />
                        </a>

                        {/* Admin Settings */}
                        <a href="?admin" className="home-nav-card card-purple hover-float">
                            <div className="home-nav-icon">
                                <Settings />
                            </div>
                            <div className="home-nav-content">
                                <h3>後台設定</h3>
                                <p>調整所有計算參數：底薪、獎金級距、學費、營運成本等。變更即時生效。</p>
                            </div>
                            <ChevronRight className="home-nav-arrow" />
                        </a>
                    </div>
                </section>

                {/* Feature Descriptions */}
                <section className="home-features-section">
                    <h2 className="home-section-title">功能說明</h2>

                    {/* Salary Calculator Features */}
                    <div className="home-feature-block">
                        <div className="home-feature-header">
                            <Calculator className="home-feature-icon text-blue" />
                            <h3>薪資計算器</h3>
                        </div>
                        <div className="home-feature-grid">
                            <div className="home-feature-item">
                                <Users className="icon-sm" />
                                <div>
                                    <h4>老師類型切換</h4>
                                    <p>支援正職（底薪+獎金）與 PT（時薪制）兩種計算模式</p>
                                </div>
                            </div>
                            <div className="home-feature-item">
                                <TrendingUp className="icon-sm" />
                                <div>
                                    <h4>獎金自動計算</h4>
                                    <p>根據班級人數自動套用對應的獎金級距表</p>
                                </div>
                            </div>
                            <div className="home-feature-item">
                                <FileSpreadsheet className="icon-sm" />
                                <div>
                                    <h4>多班級管理</h4>
                                    <p>新增/刪除班級，設定班型、人數、時數與頻率</p>
                                </div>
                            </div>
                            <div className="home-feature-item">
                                <Download className="icon-sm" />
                                <div>
                                    <h4>匯出與分享</h4>
                                    <p>產生分享連結或匯出 CSV 明細表</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Boss Dashboard Features */}
                    <div className="home-feature-block">
                        <div className="home-feature-header">
                            <Target className="home-feature-icon text-indigo" />
                            <h3>Boss 損益儀表板</h3>
                        </div>
                        <div className="home-feature-grid">
                            <div className="home-feature-item">
                                <Users className="icon-sm" />
                                <div>
                                    <h4>師資矩陣</h4>
                                    <p>管理多位老師，每位可設定多個班級，自動計算個別損益</p>
                                </div>
                            </div>
                            <div className="home-feature-item">
                                <TrendingUp className="icon-sm" />
                                <div>
                                    <h4>即時損益分析</h4>
                                    <p>總營收、總成本、淨利潤、利潤率一目了然</p>
                                </div>
                            </div>
                            <div className="home-feature-item">
                                <Target className="icon-sm" />
                                <div>
                                    <h4>目標進度追蹤</h4>
                                    <p>設定學員目標，追蹤達成率，獲得策略建議</p>
                                </div>
                            </div>
                            <div className="home-feature-item">
                                <Printer className="icon-sm" />
                                <div>
                                    <h4>報表列印</h4>
                                    <p>一鍵產生專業財務報表，支援 PDF 列印</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Settings Features */}
                    <div className="home-feature-block">
                        <div className="home-feature-header">
                            <Settings className="home-feature-icon text-purple" />
                            <h3>後台設定</h3>
                        </div>
                        <div className="home-feature-grid">
                            <div className="home-feature-item">
                                <TrendingUp className="icon-sm" />
                                <div>
                                    <h4>核心財務參數</h4>
                                    <p>正職底薪、PT 基本時薪、課程期數、目標學員數</p>
                                </div>
                            </div>
                            <div className="home-feature-item">
                                <FileSpreadsheet className="icon-sm" />
                                <div>
                                    <h4>獎金/時薪級距表</h4>
                                    <p>可視化編輯 5/10/15 人班的獎金與時薪對照表</p>
                                </div>
                            </div>
                            <div className="home-feature-item">
                                <Download className="icon-sm" />
                                <div>
                                    <h4>匯入/匯出設定</h4>
                                    <p>備份設定為 JSON 檔案，或從備份還原</p>
                                </div>
                            </div>
                            <div className="home-feature-item">
                                <RefreshCw className="icon-sm" />
                                <div>
                                    <h4>一鍵重設</h4>
                                    <p>快速恢復所有參數至系統預設值</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Start */}
                <section className="home-quickstart-section">
                    <h2 className="home-section-title">快速開始</h2>
                    <div className="home-quickstart-steps">
                        <div className="home-step">
                            <div className="home-step-number">1</div>
                            <div className="home-step-content">
                                <h4>設定參數</h4>
                                <p>前往「後台設定」確認底薪、學費等參數是否符合現況</p>
                            </div>
                        </div>
                        <div className="home-step">
                            <div className="home-step-number">2</div>
                            <div className="home-step-content">
                                <h4>配置師資</h4>
                                <p>在「Boss 儀表板」新增老師與班級，調整人數與設定</p>
                            </div>
                        </div>
                        <div className="home-step">
                            <div className="home-step-number">3</div>
                            <div className="home-step-content">
                                <h4>分析損益</h4>
                                <p>觀察淨利變化，根據策略建議優化營運配置</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="home-footer">
                <span>薪資試算系統 2026 • Enterprise Edition • Built with React</span>
            </footer>
        </div>
    );
};

export default HomePage;
