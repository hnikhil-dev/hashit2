import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import AnalyticsDashboard from './AnalyticsDashboard';

// Currency formatter for Indian Rupees
function formatCurrency(value) {
  return value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });
}

// Investment options with different risk/return profiles
const investmentOptions = {
  stocks: {
    name: 'Stocks',
    emoji: '📈',
    description: 'Moderate risk, good returns',
    baseReturnRange: [-15, 25], // -15% to +25%
    volatility: 20, // Higher volatility
    icon: '📊',
  },
  gold: {
    name: 'Gold',
    emoji: '🏆',
    description: 'Low risk, stable returns',
    baseReturnRange: [-5, 10], // -5% to +10%
    volatility: 5, // Low volatility
    icon: '🪙',
  },
  silver: {
    name: 'Silver',
    emoji: '⭐',
    description: 'Medium risk, moderate returns',
    baseReturnRange: [-8, 15], // -8% to +15%
    volatility: 10, // Medium volatility
    icon: '💎',
  },
  commodities: {
    name: 'Commodities',
    emoji: '🌾',
    description: 'High risk, high returns',
    baseReturnRange: [-20, 30], // -20% to +30%
    volatility: 25, // High volatility
    icon: '🌾',
  },
  crypto: {
    name: 'Crypto',
    emoji: '🚀',
    description: 'Very high risk, extreme returns',
    baseReturnRange: [-40, 50], // -40% to +50%
    volatility: 40, // Very high volatility
    icon: '🔗',
  },
};

// Scripted events for each year
const scriptedEvents = {
  1: {
    title: 'First Job',
    description: 'You started your first job.',
    salaryChangePercent: 0,
    liabilityAmount: 0,
    marketModifier: 0,
    insuranceUnlocked: false,
    isEmergency: false,
    emergencyType: null,
  },
  2: {
    title: '🏥 Medical Emergency',
    description: 'Unexpected hospital expense. Insurance covers 70% if purchased.',
    salaryChangePercent: 0,
    liabilityAmount: 50000,
    marketModifier: 0,
    insuranceUnlocked: true,
    isEmergency: true,
    emergencyType: 'medical',
  },
  3: {
    title: 'Promotion',
    description: 'Salary increased by 20%.',
    salaryChangePercent: 20,
    liabilityAmount: 0,
    marketModifier: 0,
    insuranceUnlocked: false,
    isEmergency: false,
    emergencyType: null,
  },
  4: {
    title: 'Market Boom',
    description: 'Markets are performing well.',
    salaryChangePercent: 0,
    liabilityAmount: 0,
    marketModifier: 5,
    insuranceUnlocked: false,
    isEmergency: false,
    emergencyType: null,
  },
  5: {
    title: '🚗 Car Accident',
    description: 'Vehicle damage needs repair. Insurance covers 70% if purchased.',
    salaryChangePercent: 0,
    liabilityAmount: 75000,
    marketModifier: 0,
    insuranceUnlocked: true,
    isEmergency: true,
    emergencyType: 'accident',
  },
  6: {
    title: '⚠️ House Emergency',
    description: 'Urgent home repairs needed. Insurance covers 70% if purchased.',
    salaryChangePercent: 0,
    liabilityAmount: 100000,
    marketModifier: -8,
    insuranceUnlocked: true,
    isEmergency: true,
    emergencyType: 'house',
  },
};

function GameScreen({ roomCode, roomId, userId, onBackToMenu }) {
  const [currentYear, setCurrentYear] = useState(1);
  const [totalYears, setTotalYears] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [playerWealth, setPlayerWealth] = useState(50000);
  const [salary, setSalary] = useState(300000);
  
  // New: Investment allocation (key = option name, value = percentage)
  const [investmentAllocation, setInvestmentAllocation] = useState({
    stocks: 20,
    gold: 20,
    silver: 20,
    commodities: 20,
    crypto: 20,
  });
  
  const [hasInsurance, setHasInsurance] = useState(false);
  const [activeInsurance, setActiveInsurance] = useState(null); // 'medical', 'accident', 'house', or null
  const [insuranceHistory, setInsuranceHistory] = useState([]); // Track active insurances
  
  // Debt/Loan system
  const [totalDebt, setTotalDebt] = useState(0); // Total outstanding loans
  const [activeLoans, setActiveLoans] = useState([]); // Array of loan objects {id, amount, interestRate, yearsRemaining, monthlyPayment, yearTaken}
  const [loanHistory, setLoanHistory] = useState([]); // Track all loans for analytics
  const [pendingLoan, setPendingLoan] = useState(null); // Loan offered when wealth < liability
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [yearResult, setYearResult] = useState(null);
  const [roomCurrentYear, setRoomCurrentYear] = useState(1);
  const [showAnalytics, setShowAnalytics] = useState(false); // Toggle analytics view

  // Load initial game state
  useEffect(() => {
    loadGameState();
  }, [roomId, userId]);

  const loadGameState = async () => {
    try {
      // Get room info
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select('current_year, total_years')
        .eq('room_id', roomId)
        .single();

      if (roomError) throw roomError;

      setRoomCurrentYear(room.current_year);
      setTotalYears(room.total_years);

      // Get player info
      const { data: player, error: playerError } = await supabase
        .from('room_players')
        .select('users(name), current_wealth, salary, current_year')
        .eq('room_id', roomId)
        .eq('user_id', userId)
        .single();

      if (playerError) {
        // If current_year column doesn't exist yet, try without it
        if (playerError.message && playerError.message.includes('current_year')) {
          const { data: playerAlt, error: playerAltError } = await supabase
            .from('room_players')
            .select('users(name), current_wealth, salary')
            .eq('room_id', roomId)
            .eq('user_id', userId)
            .single();

          if (playerAltError) throw playerAltError;

          setPlayerName(playerAlt.users.name);
          setPlayerWealth(playerAlt.current_wealth);
          setSalary(playerAlt.salary || 300000);
          setCurrentYear(room.current_year); // Fall back to room year temporarily
        } else {
          throw playerError;
        }
      } else {
        setPlayerName(player.users.name);
        setPlayerWealth(player.current_wealth);
        setSalary(player.salary || 300000);
        // Load player's individual year, default to room year if not set
        setCurrentYear(player.current_year || room.current_year || 1);
      }

      // Load leaderboard
      await loadLeaderboard();
    } catch (err) {
      console.error('Error loading game state:', err);
      setError('Failed to load game state');
    }
  };

  const loadLeaderboard = async () => {
    try {
      const { data: players, error: playersError } = await supabase
        .from('room_players')
        .select('users(name), current_wealth')
        .eq('room_id', roomId)
        .order('current_wealth', { ascending: false });

      if (playersError) throw playersError;

      setLeaderboard(players || []);
    } catch (err) {
      console.error('Error loading leaderboard:', err);
    }
  };

  const handleSubmitYear = async () => {
    if (currentYear > totalYears) {
      setError('Game is over!');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');
    setYearResult(null);

    try {
      // STEP 1: Get current event
      const event = scriptedEvents[currentYear] || scriptedEvents[1];

      // STEP 2: Update salary based on event
      const newSalary = salary + (salary * (event.salaryChangePercent / 100));
      setSalary(newSalary);

      // STEP 3: Calculate expenses
      const expenses = newSalary * 0.4; // 40% expenses

      // STEP 4: Available money for investment
      const availableToInvest = newSalary - expenses;

      // STEP 5: Multi-Investment calculation
      const investmentBreakdown = {};
      let totalInvestmentReturn = 0;

      Object.keys(investmentAllocation).forEach((optionKey) => {
        const option = investmentOptions[optionKey];
        const allocationPercent = investmentAllocation[optionKey];
        
        // Calculate investment amount for this option
        const amountInvested = availableToInvest * (allocationPercent / 100);
        
        // Calculate random return based on option's volatility
        const returnRange = option.baseReturnRange;
        const range = returnRange[1] - returnRange[0];
        const randomReturn = (Math.random() * range) + returnRange[0];
        
        // Apply market modifier from event
        const finalReturn = randomReturn + event.marketModifier;
        const returnAmount = amountInvested * (finalReturn / 100);
        
        investmentBreakdown[optionKey] = {
          allocated: allocationPercent,
          amount: Math.round(amountInvested),
          randomReturn: Math.round(randomReturn * 100) / 100,
          marketAdjusted: Math.round((finalReturn) * 100) / 100,
          returnAmount: Math.round(returnAmount),
        };
        
        totalInvestmentReturn += returnAmount;
      });

      // STEP 6: Insurance calculation with persistence
      let insuranceCost = 0;
      let liability = event.liabilityAmount;
      let insuranceApplied = false;
      let insuranceMessage = '';

      // Check if this is an emergency and if player has active insurance
      if (event.isEmergency && event.emergencyType) {
        // Check if player just bought insurance this year
        if (hasInsurance && event.insuranceUnlocked) {
          insuranceCost = newSalary * 0.05; // 5% premium
          liability = event.liabilityAmount * 0.3; // 70% coverage (30% of damage)
          insuranceApplied = true;
          insuranceMessage = `✓ Insurance applied! Covered 70% of ${event.emergencyType} emergency.`;
          
          // Add this insurance type to active insurances for future years
          if (!insuranceHistory.includes(event.emergencyType)) {
            setInsuranceHistory([...insuranceHistory, event.emergencyType]);
          }
        }
        // Check if player has active insurance from previous years
        else if (insuranceHistory.includes(event.emergencyType)) {
          insuranceCost = 0; // No additional cost if already paid before
          liability = event.liabilityAmount * 0.3; // Still get 70% coverage
          insuranceApplied = true;
          insuranceMessage = `✓ Active insurance from previous year! Covered 70% of ${event.emergencyType} emergency.`;
        }
        // No insurance protection
        else {
          liability = event.liabilityAmount; // Full damage
          insuranceCost = 0;
          insuranceApplied = false;
          insuranceMessage = `✗ No insurance! Full liability: ${formatCurrency(event.liabilityAmount)}`;
        }
      } else {
        // Non-emergency events
        if (hasInsurance && event.insuranceUnlocked) {
          insuranceCost = newSalary * 0.05;
          liability = event.liabilityAmount * 0.3;
          insuranceApplied = true;
        } else {
          liability = event.liabilityAmount;
          insuranceCost = 0;
        }
      }

      // STEP 7: Loan calculation and processing
      let loanRepayment = 0;
      let newLoanTaken = null;
      let loanMessage = '';
      let updatedActiveLoans = [...activeLoans];
      let updatedLoanHistory = [...loanHistory];

      // Calculate loan repayments for existing loans
      updatedActiveLoans.forEach(loan => {
        loanRepayment += loan.monthlyPayment * 12; // Annual repayment
        loan.yearsRemaining -= 1;
      });

      // Remove paid-off loans
      updatedActiveLoans = updatedActiveLoans.filter(loan => loan.yearsRemaining > 0);

      // Provisional wealth before loan decision
      let provisionalWealth =
        playerWealth +
        availableToInvest +
        totalInvestmentReturn -
        liability -
        insuranceCost -
        loanRepayment;

      // Check if player needs a loan (wealth < 0 after emergency)
      if (provisionalWealth < 0 && event.isEmergency) {
        const loanNeeded = Math.abs(provisionalWealth) + 50000; // Borrow extra buffer
        const loanInterestRate = 8; // 8% annual interest
        const loanDuration = 5; // 5-year loan
        const monthlyPayment = Math.round((loanNeeded * (1 + (loanInterestRate / 100) * loanDuration)) / (loanDuration * 12));

        newLoanTaken = {
          id: Date.now(),
          amount: Math.round(loanNeeded),
          interestRate: loanInterestRate,
          yearsRemaining: loanDuration,
          monthlyPayment: monthlyPayment,
          yearTaken: currentYear,
          totalCost: monthlyPayment * loanDuration * 12,
        };

        updatedActiveLoans.push(newLoanTaken);
        updatedLoanHistory.push(newLoanTaken);
        loanMessage = `⚠️ Emergency loan taken: ${formatCurrency(Math.round(loanNeeded))} at ${loanInterestRate}% interest (5-year term). Monthly payment: ${formatCurrency(monthlyPayment)}`;
        provisionalWealth += loanNeeded;
      }

      // Update loan repayment with new loan's first payment if taken
      if (newLoanTaken) {
        loanRepayment += newLoanTaken.monthlyPayment * 12;
      }

      // STEP 7: Final Wealth update
      const newWealth = provisionalWealth;

      // Store year result for display
      setYearResult({
        event,
        salary: newSalary,
        expenses,
        availableToInvest,
        investmentBreakdown,
        totalInvestmentReturn: Math.round(totalInvestmentReturn),
        insuranceCost,
        liability,
        loanRepayment: Math.round(loanRepayment),
        newLoanTaken,
        loanMessage,
        activeLoans: updatedActiveLoans,
        newWealth: Math.round(newWealth),
        insuranceApplied,
        insuranceMessage,
        activeInsurances: insuranceHistory,
      });

      // Update state
      setActiveLoans(updatedActiveLoans);
      setLoanHistory(updatedLoanHistory);
      setTotalDebt(updatedActiveLoans.reduce((sum, loan) => sum + loan.amount, 0));

      // STEP 8: Insert game progress
      const { error: progressError } = await supabase
        .from('game_progress')
        .insert([
          {
            room_id: roomId,
            user_id: userId,
            year_number: currentYear,
            net_wealth: Math.round(newWealth),
          },
        ]);

      if (progressError) throw progressError;

      // STEP 9: Update room_players with new wealth, salary, and current year
      const nextYear = currentYear + 1;
      const updatePayload = {
        current_wealth: Math.round(newWealth),
        salary: Math.round(newSalary),
        current_year: nextYear,
      };

      let updateError = null;
      const updateResult = await supabase
        .from('room_players')
        .update(updatePayload)
        .eq('room_id', roomId)
        .eq('user_id', userId);

      if (updateResult.error) {
        // If current_year column doesn't exist, try without it
        if (updateResult.error.message && updateResult.error.message.includes('current_year')) {
          const fallbackResult = await supabase
            .from('room_players')
            .update({
              current_wealth: Math.round(newWealth),
              salary: Math.round(newSalary),
            })
            .eq('room_id', roomId)
            .eq('user_id', userId);
          
          if (fallbackResult.error) {
            updateError = fallbackResult.error;
          }
        } else {
          updateError = updateResult.error;
        }
      }

      if (updateError) throw updateError;

      // Update local state
      setPlayerWealth(Math.round(newWealth));

      // STEP 10: Check if player has completed all years
      if (nextYear <= totalYears) {
        // Player still has more years to play
        setCurrentYear(nextYear);
        // Don't reset insurance - keep active if purchased in this or previous years
        setHasInsurance(hasInsurance); // Keep the state from this year
        
        // Only increment room year if it hasn't reached this year yet
        if (nextYear > roomCurrentYear) {
          const { error: yearError } = await supabase
            .from('rooms')
            .update({ current_year: nextYear })
            .eq('room_id', roomId)
            .eq('current_year', currentYear);

          if (yearError && yearError.code !== 'PGRST116') {
            throw yearError;
          }
          setRoomCurrentYear(nextYear);
        }
      } else {
        // Player has completed all years - GAME OVER for this player
        setMessage(
          '🎊 GAME COMPLETE! 🎊\n\nFinal Wealth: ' +
            formatCurrency(Math.round(newWealth)) +
            '\n\nYou completed all ' + totalYears + ' years!\nCheck the leaderboard for final rankings.'
        );
        // Don't increment currentYear - keep it at totalYears + 1 to show game is over
        setCurrentYear(nextYear);
      }

      // Reset allocation to default for next year (if game continues)
      setInvestmentAllocation({
        stocks: 20,
        gold: 20,
        silver: 20,
        commodities: 20,
        crypto: 20,
      });
      await loadLeaderboard();
    } catch (err) {
      console.error('Error submitting year:', err);
      setError('Failed to submit year. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  const gameOver = currentYear > totalYears;
  const currentEvent = scriptedEvents[currentYear] || scriptedEvents[1];
  const insuranceUnlocked = currentEvent.insuranceUnlocked;
  const insuranceCost = salary * 0.05;

  return (
    <div className="game-screen">
      <header className="game-header">
        <h1>HashIt Finance Simulation</h1>
        <button onClick={onBackToMenu} className="back-button">
          ← Back to Menu
        </button>
      </header>

      <div className="game-container">
        {/* Main Game Panel */}
        <div className="game-panel">
          <div className="game-info">
            <div className="info-item">
              <label>Room Code</label>
              <div className="info-value">{roomCode}</div>
            </div>
            <div className="info-item">
              <label>Year</label>
              <div className="info-value">
                {currentYear} / {totalYears}
              </div>
            </div>
            <div className="info-item">
              <label>Player</label>
              <div className="info-value">{playerName}</div>
            </div>
            <div className="info-item highlight">
              <label>Current Wealth</label>
              <div className="info-value">{formatCurrency(playerWealth)}</div>
            </div>
          </div>

          {gameOver ? (
            <div className="game-over-message">
              <h2>Game Over!</h2>
              <p>Final Wealth: {formatCurrency(playerWealth)}</p>
              <p>Check the leaderboard to see final rankings.</p>
            </div>
          ) : (
            <div className="year-submission">
              <h2>Year {currentYear} - Life Events & Decisions</h2>

              {/* EVENT CARD */}
              <div className="event-card">
                <div className="event-title">{currentEvent.title}</div>
                <div className="event-description">{currentEvent.description}</div>
                {currentEvent.liabilityAmount > 0 && (
                  <div className="event-liability">
                    <strong>Liability:</strong> {formatCurrency(currentEvent.liabilityAmount)}
                  </div>
                )}
                {currentEvent.salaryChangePercent > 0 && (
                  <div className="event-bonus">
                    <strong>Salary +{currentEvent.salaryChangePercent}%</strong>
                  </div>
                )}
                {currentEvent.marketModifier !== 0 && (
                  <div className="event-market">
                    <strong>Market Modifier: +{currentEvent.marketModifier}%</strong>
                  </div>
                )}
              </div>

              {/* YEAR RESULT DISPLAY */}
              {yearResult && (
                <div className="year-result-card">
                  <h3>Year {currentYear - 1} Summary</h3>
                  <div className="result-row">
                    <span>Base Salary:</span>
                    <strong>{formatCurrency(salary - (salary * (currentEvent.salaryChangePercent / 100)))}</strong>
                  </div>
                  {currentEvent.salaryChangePercent > 0 && (
                    <div className="result-row highlight-positive">
                      <span>Salary Increase (+{currentEvent.salaryChangePercent}%):</span>
                      <strong>+{formatCurrency(salary * (currentEvent.salaryChangePercent / 100))}</strong>
                    </div>
                  )}
                  <div className="result-row">
                    <span>Expenses (40%):</span>
                    <strong>-{formatCurrency(yearResult.expenses)}</strong>
                  </div>
                  <div className="result-row">
                    <span>Investment Options:</span>
                  </div>
                  {Object.keys(yearResult.investmentBreakdown).map((optionKey) => {
                    const breakdown = yearResult.investmentBreakdown[optionKey];
                    const option = investmentOptions[optionKey];
                    return (
                      <div key={optionKey} className="result-row investment-detail">
                        <span>
                          {option.emoji} {option.name} ({breakdown.allocated}%): {formatCurrency(breakdown.amount)} 
                          <span className="investment-return"> {breakdown.marketAdjusted}%</span>
                        </span>
                        <strong className={breakdown.returnAmount >= 0 ? 'positive' : 'negative'}>
                          {breakdown.returnAmount >= 0 ? '+' : ''}
                          {formatCurrency(breakdown.returnAmount)}
                        </strong>
                      </div>
                    );
                  })}
                  <div className="result-row">
                    <span>Total Investment Return:</span>
                    <strong className={yearResult.totalInvestmentReturn >= 0 ? 'positive' : 'negative'}>
                      {yearResult.totalInvestmentReturn >= 0 ? '+' : ''}
                      {formatCurrency(yearResult.totalInvestmentReturn)}
                    </strong>
                  </div>
                  {yearResult.liability > 0 && (
                    <div className="result-row highlight-negative">
                      <span>Liability Loss:</span>
                      <strong>-{formatCurrency(yearResult.liability)}</strong>
                    </div>
                  )}
                  {yearResult.insuranceMessage && (
                    <div className={`result-row insurance-message ${yearResult.insuranceApplied ? 'insurance-protected' : 'insurance-unprotected'}`}>
                      <span>{yearResult.insuranceMessage}</span>
                    </div>
                  )}
                  {yearResult.insuranceCost > 0 && (
                    <div className="result-row">
                      <span>Insurance Premium (5%):</span>
                      <strong>-{formatCurrency(yearResult.insuranceCost)}</strong>
                    </div>
                  )}
                  {yearResult.activeInsurances && yearResult.activeInsurances.length > 0 && (
                    <div className="result-row active-insurances">
                      <span>Active Insurances:</span>
                      <strong>{yearResult.activeInsurances.map(ins => {
                        const labels = {medical: '🏥 Medical', accident: '🚗 Accident', house: '⚠️ House'};
                        return labels[ins] || ins;
                      }).join(', ')}</strong>
                    </div>
                  )}
                  {yearResult.loanRepayment > 0 && (
                    <div className="result-row highlight-warning">
                      <span>Loan Repayment:</span>
                      <strong>-{formatCurrency(yearResult.loanRepayment)}</strong>
                    </div>
                  )}
                  {yearResult.loanMessage && (
                    <div className="result-row loan-taken-message">
                      <span>{yearResult.loanMessage}</span>
                    </div>
                  )}
                  <div className="result-row final-wealth">
                    <span>New Wealth:</span>
                    <strong>{formatCurrency(yearResult.newWealth)}</strong>
                  </div>
                </div>
              )}

              <div className="salary-breakdown">
                <p>Current Salary: <strong>{formatCurrency(salary)}</strong></p>
                <p>Expenses (40%): <strong>{formatCurrency(salary * 0.4)}</strong></p>
                <p>Available: <strong>{formatCurrency(salary * 0.6)}</strong></p>
              </div>

              {/* INSURANCE SECTION */}
              <div className="insurance-section">
                <h3>🛡️ Insurance Protection</h3>
                
                {/* Active Insurances Display */}
                {insuranceHistory.length > 0 && (
                  <div className="active-insurance-list">
                    <p className="active-title">Your Active Insurance Policies:</p>
                    <div className="insurance-badges">
                      {insuranceHistory.map((insType) => {
                        const labels = {
                          medical: { emoji: '🏥', name: 'Medical Coverage' },
                          accident: { emoji: '🚗', name: 'Accident Coverage' },
                          house: { emoji: '⚠️', name: 'Home Coverage' }
                        };
                        const label = labels[insType];
                        return (
                          <div key={insType} className="insurance-badge">
                            <span>{label.emoji} {label.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Emergency Event Info */}
                {currentEvent.isEmergency && (
                  <div className="emergency-alert">
                    <h4>⚠️ Emergency Event This Year!</h4>
                    <p className="emergency-type">{currentEvent.title}</p>
                    <p className="emergency-impact">
                      Potential Damage: {formatCurrency(currentEvent.liabilityAmount)}
                    </p>
                    <p className="emergency-note">
                      {insuranceHistory.includes(currentEvent.emergencyType) 
                        ? `✓ You have active ${currentEvent.emergencyType} insurance - 70% covered!`
                        : `✗ No active insurance for this emergency - buy insurance to protect!`}
                    </p>
                  </div>
                )}

                {/* Insurance Purchase Option */}
                {insuranceUnlocked && (
                  <div className="insurance-control">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={hasInsurance}
                        onChange={(e) => setHasInsurance(e.target.checked)}
                        disabled={loading}
                      />
                      <span className="checkbox-text">
                        Buy {currentEvent.emergencyType ? currentEvent.emergencyType.toUpperCase() : 'General'} Insurance (5% salary = {formatCurrency(salary * 0.05)})
                      </span>
                    </label>
                    <div className="insurance-info">
                      {hasInsurance ? (
                        <p className="insurance-active">
                          ✓ Insurance purchased - Covers 70% of this {currentEvent.emergencyType || 'event'}'s costs and carries over to future years!
                        </p>
                      ) : (
                        <p className="insurance-inactive">
                          ✗ No insurance - You'll bear full cost if emergency occurs
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* MULTI-INVESTMENT OPTIONS */}
              <div className="investment-control">
                <h3>💰 Investment Allocation</h3>
                <p className="investment-instruction">
                  Allocate your {formatCurrency(salary * 0.6)} across different investment options:
                </p>
                
                <div className="investment-options-grid">
                  {Object.keys(investmentOptions).map((optionKey) => {
                    const option = investmentOptions[optionKey];
                    const allocation = investmentAllocation[optionKey];
                    const amount = (salary * 0.6 * allocation) / 100;
                    
                    return (
                      <div key={optionKey} className="investment-option-card">
                        <div className="option-header">
                          <span className="option-emoji">{option.emoji}</span>
                          <h4>{option.name}</h4>
                        </div>
                        <p className="option-description">{option.description}</p>
                        <p className="option-return-range">
                          Return: {option.baseReturnRange[0]}% to {option.baseReturnRange[1]}%
                        </p>
                        <div className="option-slider-container">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={allocation}
                            onChange={(e) => {
                              const newAllocation = parseInt(e.target.value);
                              const totalAllocation = Object.keys(investmentOptions).reduce(
                                (sum, key) => sum + (key === optionKey ? newAllocation : investmentAllocation[key]),
                                0
                              );
                              
                              // If total exceeds 100, scale down other allocations
                              if (totalAllocation > 100) {
                                const overage = totalAllocation - 100;
                                const otherKeys = Object.keys(investmentOptions).filter(k => k !== optionKey);
                                const scaleFactor = otherKeys.length > 0 ? (100 - newAllocation) / (100 - allocation) : 1;
                                
                                const newAllocations = { ...investmentAllocation };
                                newAllocations[optionKey] = newAllocation;
                                
                                otherKeys.forEach((key) => {
                                  newAllocations[key] = Math.max(0, Math.round(investmentAllocation[key] * scaleFactor));
                                });
                                
                                setInvestmentAllocation(newAllocations);
                              } else {
                                setInvestmentAllocation({
                                  ...investmentAllocation,
                                  [optionKey]: newAllocation,
                                });
                              }
                            }}
                            disabled={loading}
                            className="option-slider"
                          />
                          <span className="allocation-percent">{allocation}%</span>
                        </div>
                        <p className="allocated-amount">
                          Amount: {formatCurrency(Math.round(amount))}
                        </p>
                      </div>
                    );
                  })}
                </div>
                
                <div className="allocation-summary">
                  <p>
                    Total Allocation: <strong>
                      {Object.values(investmentAllocation).reduce((a, b) => a + b, 0)}%
                    </strong>
                  </p>
                </div>
              </div>

              {/* DEBT/LOAN SECTION */}
              {(activeLoans.length > 0 || totalDebt > 0) && (
                <div className="debt-section">
                  <h3>💳 Active Loans</h3>
                  <div className="debt-summary">
                    <p>Total Outstanding Debt: <strong className="debt-amount">{formatCurrency(totalDebt)}</strong></p>
                  </div>
                  <div className="loans-list">
                    {activeLoans.map((loan) => (
                      <div key={loan.id} className="loan-item">
                        <div className="loan-header">
                          <span className="loan-year">Year {loan.yearTaken}</span>
                          <span className="loan-status">{loan.yearsRemaining} years remaining</span>
                        </div>
                        <div className="loan-details">
                          <div className="detail-row">
                            <span>Principal Amount:</span>
                            <strong>{formatCurrency(loan.amount)}</strong>
                          </div>
                          <div className="detail-row">
                            <span>Interest Rate:</span>
                            <strong>{loan.interestRate}%</strong>
                          </div>
                          <div className="detail-row">
                            <span>Annual Repayment:</span>
                            <strong className="warning">{formatCurrency(loan.monthlyPayment * 12)}</strong>
                          </div>
                          <div className="detail-row">
                            <span>Total Cost (with interest):</span>
                            <strong>{formatCurrency(loan.totalCost)}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}
              {message && <div className="success-message">{message}</div>}

              <div className="game-controls">
                <button
                  onClick={() => setShowAnalytics(true)}
                  className="secondary-button"
                  disabled={loading}
                >
                  📊 View Analytics
                </button>
                <button
                  onClick={handleSubmitYear}
                  className="primary-button"
                  disabled={loading || gameOver}
                >
                  {loading ? 'Processing...' : 'End Year'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Leaderboard Panel */}
        <div className="leaderboard-panel">
          <h2>Leaderboard</h2>
          <div className="leaderboard-table">
            {leaderboard.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Wealth</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((player, index) => (
                    <tr
                      key={index}
                      className={userId === player.user_id ? 'current-player' : ''}
                    >
                      <td className="rank">{index + 1}</td>
                      <td>{player.users.name}</td>
                      <td className="wealth">
                        {formatCurrency(player.current_wealth)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty-message">No players yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Modal */}
      {showAnalytics && (
        <AnalyticsDashboard
          playerName={playerName}
          currentYear={currentYear}
          totalYears={totalYears}
          currentWealth={playerWealth}
          salary={salary}
          gameProgress={[]} // Would need to load from database or track in state
          investmentAllocation={investmentAllocation}
          insuranceHistory={insuranceHistory}
          activeLoans={activeLoans}
          loanHistory={loanHistory}
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
}

export default GameScreen;
