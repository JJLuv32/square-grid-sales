import React, { useState } from 'react';
import { DollarSign, ShoppingCart, Lock } from 'lucide-react';

export default function App() {
  const GRID_SIZE = 10;
  const PRICE_PER_SQUARE = 5;
  
  // Initialize 10x10 grid with empty squares
  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => ({ 
        initials: '', 
        locked: false 
      }))
    )
  );
  
  const [selectedSquares, setSelectedSquares] = useState([]);
  const [currentInitials, setCurrentInitials] = useState('');

  const handleSquareClick = (row, col) => {
    // Don't allow clicking locked squares
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
    const value = e.target.value.toUpperCase().slice(0, 3);
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

  const handleVenmoCheckout = () => {
    if (selectedSquares.length === 0) return;
    
    const amount = total.toFixed(2);
    const note = `Square Grid - ${selectedSquares.length} squares`;
    const venmoUrl = `https://venmo.com/u/Jonathan-Coleman-80?txn=pay&amount=${amount}&note=${encodeURIComponent(note)}`;
    
    // Lock all selected squares
    const newGrid = grid.map(row => row.map(square => ({ ...square })));
    selectedSquares.forEach(({ row, col }) => {
      newGrid[row][col].locked = true;
    });
    
    setGrid(newGrid);
    setSelectedSquares([]);
    
    // Open Venmo
    window.open(venmoUrl, '_blank');
  };

  const handleCashAppCheckout = () => {
    if (selectedSquares.length === 0) return;
    
    const amount = total.toFixed(2);
    const note = `Square Grid - ${selectedSquares.length} squares`;
    const cashAppUrl = `https://cash.app/$jjluv/${amount}?note=${encodeURIComponent(note)}`;
    
    // Lock all selected squares
    const newGrid = grid.map(row => row.map(square => ({ ...square })));
    selectedSquares.forEach(({ row, col }) => {
      newGrid[row][col].locked = true;
    });
    
    setGrid(newGrid);
    setSelectedSquares([]);
    
    // Open Cash App
    window.open(cashAppUrl, '_blank');
  };

  const total = selectedSquares.length * PRICE_PER_SQUARE;

  const getSquareStyle = (row, col) => {
    const square = grid[row][col];
    const isSelected = selectedSquares.some(sq => sq.row === row && sq.col === col);
    
    if (square.locked) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Square Grid Sales</h1>
          <p className="text-gray-600">Select your squares • ${PRICE_PER_SQUARE} per square</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grid Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-10 gap-1 mb-4">
                {grid.map((row, rowIndex) => (
                  row.map((square, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleSquareClick(rowIndex, colIndex)}
                      className={`aspect-square flex items-center justify-center text-xs font-bold rounded transition-all ${getSquareStyle(rowIndex, colIndex)}`}
                    >
                      {square.locked && !square.initials && <Lock size={12} className="text-gray-600" />}
                      {square.initials && (
                        <span className={square.locked ? 'text-gray-700' : 'text-gray-800'}>
                          {square.initials}
                        </span>
                      )}
                    </div>
                  ))
                ))}
              </div>
              
              <div className="flex gap-2 text-xs text-gray-600">
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
                  <span>Sold</span>
                </div>
              </div>
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

              {selectedSquares.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Initials (up to 3 letters)
                  </label>
                  <input
                    type="text"
                    value={currentInitials}
                    onChange={handleInitialsChange}
                    placeholder="ABC"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-center font-bold text-lg uppercase"
                    maxLength={3}
                  />
                  <button
                    onClick={handleAddInitials}
                    disabled={!currentInitials}
                    className="w-full mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Initials to Selected
                  </button>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleVenmoCheckout}
                  disabled={selectedSquares.length === 0}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Pay with Venmo ${total.toFixed(2)}
                </button>

                <button
                  onClick={handleCashAppCheckout}
                  disabled={selectedSquares.length === 0}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-bold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Pay with Cash App ${total.toFixed(2)}
                </button>
              </div>

              {selectedSquares.length === 0 && (
                <p className="mt-4 text-sm text-gray-500 text-center">
                  Click squares on the grid to select them
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
