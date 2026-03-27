import React from 'react';

function formatCurrency(value) {
  return value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
}

function AnalyticsDashboard({ 
  playerName, 
  currentYear, 
  totalYears, 
  currentWealth, 
  salary,
  gameProgress,
  investmentAllocation,
  insuranceHistory,
  activeLoans,
  loanHistory,
  onClose 
}) {
  // Calculate statistics
  const wealthProgression = gameProgress.map(gp => gp.net_wealth);
  const startingWealth = wealthProgression[0] || 50000;
  const endingWealth = wealthProgression[wealthProgression.length - 1] || currentWealth;
  const wealthGain = endingWealth - startingWealth;
  const wealthGainPercent = ((wealthGain / startingWealth) * 100).toFixed(1);
  
  // Investment stats
  const investmentAllocations = Object.entries(investmentAllocation || {}).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    allocation: value,
  }));
  
  // Insurance stats
  const insuranceTypes = {
    medical: '🏥 Medical Coverage',
    accident: '🚗 Accident Coverage',
    house: '⚠️ House Coverage',
  };
  
  // Loan stats
  const totalDebt = activeLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalLoansTaken = loanHistory.length;
  const totalInterestCost = loanHistory.reduce((sum, loan) => sum + (loan.totalCost - loan.amount), 0);
  
  // Calculate average wealth
  const avgWealth = wealthProgression.length > 0 
    ? Math.round(wealthProgression.reduce((a, b) => a + b, 0) / wealthProgression.length)
    : 0;
  
  // Debt percentage of wealth
  const debtToWealthRatio = currentWealth > 0 ? ((totalDebt / currentWealth) * 100).toFixed(1) : 0;
  
  // Progress percentage
  const progressPercent = Math.round((currentYear / totalYears) * 100);

  return (
    <div className="analytics-overlay">
      <div className="analytics-modal">
        <div className="analytics-header">
          <h2>📊 Game Analytics - {playerName}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="analytics-content">
          {/* Progress Section */}
          <div className="analytics-section progress-section">
            <h3>🎮 Game Progress</h3>
            <div className="progress-stats">
              <div className="stat-card">
                <div className="stat-label">Current Year</div>
                <div className="stat-value">{currentYear} / {totalYears}</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <div className="progress-percent">{progressPercent}%</div>
              </div>
            </div>
          </div>

          {/* Wealth Section */}
          <div className="analytics-section wealth-section">
            <h3>💰 Wealth Statistics</h3>
            <div className="wealth-stats">
              <div className="stat-card">
                <div className="stat-label">Starting Wealth</div>
                <div className="stat-value">{formatCurrency(startingWealth)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Current Wealth</div>
                <div className={`stat-value ${currentWealth > startingWealth ? 'positive' : 'negative'}`}>
                  {formatCurrency(currentWealth)}
                </div>
              </div>
              <div className="stat-card">
                <div className={`stat-label ${wealthGain > 0 ? 'positive' : 'negative'}`}>
                  {wealthGain > 0 ? 'Wealth Gain' : 'Wealth Loss'}
                </div>
                <div className={`stat-value ${wealthGain > 0 ? 'positive' : 'negative'}`}>
                  {wealthGain > 0 ? '+' : ''}{formatCurrency(wealthGain)} ({wealthGainPercent}%)
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Average Wealth</div>
                <div className="stat-value">{formatCurrency(avgWealth)}</div>
              </div>
            </div>
            
            {/* Wealth Progression Chart */}
            {wealthProgression.length > 1 && (
              <div className="wealth-chart">
                <p className="chart-title">Wealth Progression Over Years</p>
                <div className="chart-container">
                  {wealthProgression.map((wealth, index) => {
                    const maxWealth = Math.max(...wealthProgression);
                    const minWealth = Math.min(...wealthProgression);
                    const range = maxWealth - minWealth || 1;
                    const percent = ((wealth - minWealth) / range) * 100;
                    
                    return (
                      <div key={index} className="chart-bar-wrapper">
                        <div className="chart-bar" style={{ height: `${percent}%` }}>
                          <span className="chart-value">{formatCurrency(wealth)}</span>
                        </div>
                        <div className="chart-label">Year {index + 1}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Investment Section */}
          <div className="analytics-section investment-section">
            <h3>📈 Investment Allocation</h3>
            <div className="allocation-grid">
              {investmentAllocations.map((inv) => (
                <div key={inv.name} className="allocation-card">
                  <div className="allocation-name">{inv.name}</div>
                  <div className="allocation-value">{inv.allocation}%</div>
                  <div className="allocation-bar">
                    <div className="allocation-fill" style={{ width: `${inv.allocation}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Section */}
          <div className="analytics-section insurance-section">
            <h3>🛡️ Insurance Coverage</h3>
            <div className="insurance-stats">
              <div className="stat-card">
                <div className="stat-label">Active Insurance Policies</div>
                <div className="stat-value">{insuranceHistory.length} / 3</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Insurance Types</div>
                <div className="insurance-list">
                  {insuranceHistory.length > 0 ? (
                    insuranceHistory.map((type) => (
                      <div key={type} className="insurance-item">
                        {insuranceTypes[type] || type}
                      </div>
                    ))
                  ) : (
                    <p className="no-insurance">No active insurance policies</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Loan Section */}
          <div className="analytics-section loan-section">
            <h3>💳 Debt Management</h3>
            <div className="loan-stats">
              <div className="stat-card">
                <div className="stat-label">Total Outstanding Debt</div>
                <div className={`stat-value ${totalDebt > 0 ? 'negative' : 'positive'}`}>
                  {formatCurrency(totalDebt)}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Debt-to-Wealth Ratio</div>
                <div className={`stat-value ${debtToWealthRatio > 50 ? 'negative' : debtToWealthRatio > 30 ? 'warning' : 'positive'}`}>
                  {debtToWealthRatio}%
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Loans Taken</div>
                <div className="stat-value">{totalLoansTaken}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Interest Paid</div>
                <div className={`stat-value ${totalInterestCost > 0 ? 'negative' : 'positive'}`}>
                  {formatCurrency(totalInterestCost)}
                </div>
              </div>
            </div>
            
            {/* Loan History */}
            {loanHistory.length > 0 && (
              <div className="loan-history">
                <p className="history-title">Loan History</p>
                {loanHistory.map((loan) => (
                  <div key={loan.id} className="history-item">
                    <div className="history-row">
                      <span>Year {loan.yearTaken} Loan:</span>
                      <strong>{formatCurrency(loan.amount)}</strong>
                    </div>
                    <div className="history-row">
                      <span>Interest Cost:</span>
                      <strong className="negative">{formatCurrency(loan.totalCost - loan.amount)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Salary Section */}
          <div className="analytics-section salary-section">
            <h3>💼 Salary Information</h3>
            <div className="salary-stats">
              <div className="stat-card">
                <div className="stat-label">Current Salary</div>
                <div className="stat-value">{formatCurrency(salary)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Annual Expenses (40%)</div>
                <div className="stat-value">{formatCurrency(salary * 0.4)}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Available for Investment</div>
                <div className="stat-value">{formatCurrency(salary * 0.6)}</div>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="analytics-section summary-section">
            <h3>📋 Game Summary</h3>
            <div className="summary-content">
              <p><strong>Player:</strong> {playerName}</p>
              <p><strong>Progress:</strong> Year {currentYear} of {totalYears}</p>
              <p><strong>Final Status:</strong> {currentWealth > startingWealth ? '✓ Wealth Increased' : '✗ Wealth Decreased'}</p>
              <p><strong>Total Return:</strong> {wealthGainPercent}%</p>
              <p><strong>Insurance Covered:</strong> {insuranceHistory.length} emergency types</p>
              <p><strong>Debt Status:</strong> {totalDebt > 0 ? `${totalLoansTaken} active loans` : 'Debt-free'}</p>
            </div>
          </div>
        </div>

        <div className="analytics-footer">
          <button className="secondary-button" onClick={onClose}>Close Analytics</button>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
