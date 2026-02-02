import React, { useState } from 'react';
import { DollarSign, ShoppingCart, Lock, Unlock } from 'lucide-react';

export default function App() {
  const GRID_SIZE = 10;
  const PRICE_PER_SQUARE = 10;
  const ADMIN_PASSWORD = "batmaN"; // Admin password
  
  // Initialize 10x10 grid with empty squares
  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => ({ 
        initials: '', 
        locked: false,
        highlighted: false
      }))
    )
  );
  
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [currentInitials, setCurrentInitials] = useState('');
  const [adminMode, setAdminMode] = useState(false);
  const [showAdminInput, setShowAdminInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const [columnLetters, setColumnLetters] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);
  const [rowLetters, setRowLetters] = useState(['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setAdminMode(true);
      setShowAdminInput(false);
      setAdminPassword('');
    } else {
      alert('Incorrect password');
      setAdminPassword('');
    }
  };

  const handleColumnLetterClick = (index) => {
    if (!adminMode) return;
    
    const newValue = prompt(`Change column ${index + 1} (currently "${columnLetters[index]}") to:`, columnLetters[index]);
    if (newValue !== null && newValue.trim() !== '') {
      const newColumnLetters = [...columnLetters];
      newColumnLetters[index] = newValue.trim().toUpperCase();
      setColumnLetters(newColumnLetters);
    }
  };

  const handleRowLetterClick = (index) => {
    if (!adminMode) return;
    
    const newValue = prompt(`Change row ${index + 1} (currently "${rowLetters[index]}") to:`, rowLetters[index]);
    if (newValue !== null && newValue.trim() !== '') {
      const newRowLetters = [...rowLetters];
      newRowLetters[index] = newValue.trim().toUpperCase();
      setRowLetters(newRowLetters);
    }
  };

  const handleSquareClick = (row, col, event) => {
    // Admin mode with Shift key: toggle yellow highlight
    if (adminMode && event?.shiftKey) {
      const newGrid = grid.map(r => r.map(square => ({ ...square })));
      newGrid[row][col].highlighted = !newGrid[row][col].highlighted;
      setGrid(newGrid);
      return;
    }

    // Admin mode: unlock and clear any square
    if (adminMode) {
      const newGrid = grid.map(r => r.map(square => ({ ...square })));
      newGrid[row][col].locked = false;
      newGrid[row][col].initials = '';
      setGrid(newGrid);
      return;
    }

    // Don't allow clicking locked squares in normal mode
    if (grid[row][col].locked) return;
    
    // Check if square is already selected in current session
    const isSelected = selectedSquares.some(sq => sq.row === row && sq.col === col);
    
    if (isSelected) {
      // Deselect the square
      setSelectedSquares(selectedSquares.filter(sq => !(sq.row === row && sq.col === col)));
    } else {
      // Select the square
      setSelectedSquares([...selectedSquares, { row, col }]);
    }
  };

  const handleInitialsChange = (e) => {
    const value = e.target.value.toUpperCase().slice(0, 7);
    setCurrentInitials(value);
  };

  const handleAddInitials = () => {
    if (!currentInitials || selectedSquares.length === 0) return;
    
    const newGrid = grid.map(row => row.map(square => ({ ...square })));
    
    selectedSquares.forEach(({ row, col }) => {
      newGrid[row][col].initials = currentInitials;
    });
    
    setGrid(newGrid);
    setCurrentInitials('');
  };

  const handleLockSquares = () => {
    if (selectedSquares.length === 0) return;
    
    // Lock all selected squares
    const newGrid = grid.map(row => row.map(square => ({ ...square })));
    selectedSquares.forEach(({ row, col }) => {
      newGrid[row][col].locked = true;
    });
    
    setGrid(newGrid);
    setSelectedSquares([]);
  };

  const handleVenmoCheckout = () => {
    const amount = total.toFixed(2);
    const note = `FUN`;
    const venmoUrl = `https://venmo.com/u/Jonathan-Coleman-80?txn=pay&amount=${amount}&note=${encodeURIComponent(note)}`;
    window.open(venmoUrl, '_blank');
  };

  const handleCashAppCheckout = () => {
    const amount = total.toFixed(2);
    const note = `FUN`;
    const cashAppUrl = `https://cash.app/$jjluv/${amount}?note=${encodeURIComponent(note)}`;
    window.open(cashAppUrl, '_blank');
  };

  const total = selectedSquares.length * PRICE_PER_SQUARE;

  const getSquareStyle = (row, col) => {
    const square = grid[row][col];
    const isSelected = selectedSquares.some(sq => sq.row === row && sq.col === col);
    
    if (square.highlighted) {
      return 'bg-yellow-300 cursor-pointer border-2 border-yellow-500';
    } else if (adminMode && square.locked) {
      return 'bg-red-200 cursor-pointer border-2 border-red-400 hover:bg-red-300';
    } else if (square.locked) {
      return 'bg-gray-300 cursor-not-allowed border-2 border-gray-400';
    } else if (isSelected) {
      return 'bg-blue-400 cursor-pointer border-2 border-blue-600 hover:bg-blue-500';
    } else if (square.initials) {
      return 'bg-green-200 cursor-pointer border-2 border-green-400 hover:bg-green-300';
    } else {
      return 'bg-white cursor-pointer border-2 border-gray-300 hover:bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen p-8" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1920&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-[2px] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Big Game Boxes</h1>
          <p className="text-gray-600">Select your squares • ${PRICE_PER_SQUARE} per square</p>
          
          {/* Admin Mode Indicator */}
          {adminMode && (
            <div className="mt-2 inline-block bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
              🔓 ADMIN MODE - Click squares to unlock | Shift+Click to highlight yellow | Click letters to change
              <button 
                onClick={() => setAdminMode(false)}
                className="ml-3 bg-white text-red-500 px-3 py-1 rounded text-sm hover:bg-gray-100"
              >
                Exit Admin
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grid Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* New England Label - Top */}
              <div className="flex justify-center mb-2">
                <div className="text-2xl font-bold text-red-600">New England</div>
              </div>

              <div className="flex gap-2">
                {/* Empty space for alignment with row letters */}
                <div className="w-6"></div>

                {/* Column letters A-J above top row - clickable in admin mode */}
                <div className="grid grid-cols-10 gap-1 mb-1 flex-1">
                  {columnLetters.map((letter, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleColumnLetterClick(i)}
                      className={`text-center text-lg font-bold text-orange-600 ${adminMode ? 'cursor-pointer hover:bg-orange-100 rounded px-1' : ''}`}
                      title={adminMode ? 'Click to change' : ''}
                    >
                      {letter}
                    </div>
                  ))}
                </div>

                {/* Empty space for Seattle alignment */}
                <div className="w-8"></div>
              </div>

              <div className="flex gap-2">
                {/* Left side row letters K-T - clickable in admin mode */}
                <div className="flex flex-col gap-1 flex-shrink-0">
                  {rowLetters.map((letter, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleRowLetterClick(i)}
                      className={`w-6 flex-1 flex items-center justify-center text-lg font-bold text-purple-600 ${adminMode ? 'cursor-pointer hover:bg-purple-100 rounded' : ''}`}
                      title={adminMode ? 'Click to change' : ''}
                    >
                      {letter}
                    </div>
                  ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-10 gap-1 flex-1">
                  {grid.map((row, rowIndex) => (
                    row.map((square, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={(e) => handleSquareClick(rowIndex, colIndex, e)}
                        className={`aspect-square flex items-center justify-center text-xs font-bold rounded transition-all ${getSquareStyle(rowIndex, colIndex)}`}
                      >
                        {square.locked && !square.initials && !adminMode && <Lock size={12} className="text-gray-600" />}
                        {square.locked && adminMode && <Unlock size={12} className="text-red-600" />}
                        {square.initials && (
                          <span className={`text-[0.6rem] ${square.locked && !adminMode ? 'text-gray-700' : 'text-gray-800'}`}>
                            {square.initials}
                          </span>
                        )}
                      </div>
                    ))
                  ))}
                </div>

                {/* Seattle vertical on right side */}
                <div className="flex items-center ml-2">
                  <div className="text-2xl font-bold text-green-600" style={{writingMode: 'vertical-rl', textOrientation: 'upright'}}>
                    SEATTLE
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 text-xs text-gray-600 mt-4">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-blue-400 border-2 border-blue-600 rounded"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-green-200 border-2 border-green-400 rounded"></div>
                  <span>With Initials</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-300 border-2 border-gray-400 rounded"></div>
                  <span>Locked</span>
                </div>
                {adminMode && (
                  <>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-red-200 border-2 border-red-400 rounded"></div>
                      <span>Click to Unlock</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 bg-yellow-300 border-2 border-yellow-500 rounded"></div>
                      <span>Winner</span>
                    </div>
                  </>
                )}
              </div>

              {/* Hidden Admin Button - Click in bottom left corner */}
              {!adminMode && !showAdminInput && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowAdminInput(true)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Admin
                  </button>
                </div>
              )}

              {/* Admin Login */}
              {showAdminInput && !adminMode && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Password:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                      placeholder="Enter password"
                      className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={handleAdminLogin}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setShowAdminInput(false);
                        setAdminPassword('');
                      }}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingCart size={24} />
                Your Selection
              </h2>

              <div className="mb-6">
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-1">Squares Selected</div>
                  <div className="text-3xl font-bold text-blue-600">{selectedSquares.length}</div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <DollarSign size={16} />
                    Running Total
                  </div>
                  <div className="text-3xl font-bold text-green-600">${total.toFixed(2)}</div>
                </div>
              </div>

              {!adminMode && selectedSquares.length > 0 && (
                <div className="mb-6 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name/Initials (up to 7 characters)
                    </label>
                    <input
                      type="text"
                      value={currentInitials}
                      onChange={handleInitialsChange}
                      placeholder="JOHN"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center font-bold text-lg uppercase"
                      maxLength={7}
                    />
                    <button
                      onClick={handleAddInitials}
                      disabled={!currentInitials}
                      className="w-full mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Add Name to Selected
                    </button>
                  </div>

                  {/* Lock Button - only show if squares have initials */}
                  {selectedSquares.some(sq => grid[sq.row][sq.col].initials) && (
                    <button
                      onClick={handleLockSquares}
                      className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <Lock size={18} />
                      Lock My Squares
                    </button>
                  )}
                </div>
              )}

              {/* Payment Buttons - show when squares are locked AND not in admin mode */}
              {!adminMode && grid.flat().some(sq => sq.locked) && (
                <div className="space-y-3 mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Complete Payment:</div>
                  <button
                    onClick={handleVenmoCheckout}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Pay with Venmo
                  </button>

                  <button
                    onClick={handleCashAppCheckout}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Pay with Cash App
                  </button>

                  {/* Payment instruction */}
                  <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
                    <p className="text-sm font-bold text-yellow-900 text-center">
                      THE REASON FOR PAYMENT IS FUN. DO NOT ENTER ANY OTHER REASON.
                    </p>
                  </div>
                </div>
              )}

              {!adminMode && selectedSquares.length === 0 && !grid.flat().some(sq => sq.locked) && (
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Click squares on the grid to select them
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Invitation Only Message */}
        <div className="mt-8 text-center space-y-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-2xl mx-auto">
            <p className="text-gray-800 font-medium">
              This is by invitation only. If I do not know you, I thank you for your donation.
            </p>
          </div>
          <div className="bg-blue-100/80 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-900 font-medium">
              Refresh the page to clear non-locked cells.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
