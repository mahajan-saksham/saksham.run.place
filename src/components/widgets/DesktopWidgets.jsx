import { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Plus, Grid3X3 } from 'lucide-react';
import VisitorStatsWidget from './VisitorStatsWidget';
import SocialFeedWidget from './SocialFeedWidget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const DesktopWidgets = () => {
  const [widgets, setWidgets] = useState([
    { id: 'visitor-stats', component: VisitorStatsWidget, enabled: true },
    { id: 'social-feed', component: SocialFeedWidget, enabled: true },
  ]);

  const [layouts, setLayouts] = useState({
    lg: [
      { i: 'visitor-stats', x: 0, y: 0, w: 4, h: 5 },
      { i: 'social-feed', x: 4, y: 0, w: 4, h: 5 },
    ],
    md: [
      { i: 'visitor-stats', x: 0, y: 0, w: 6, h: 5 },
      { i: 'social-feed', x: 6, y: 0, w: 6, h: 5 },
    ],
    sm: [
      { i: 'visitor-stats', x: 0, y: 0, w: 12, h: 5 },
      { i: 'social-feed', x: 0, y: 5, w: 12, h: 5 },
    ]
  });

  const [showSettings, setShowSettings] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Load saved layouts from localStorage
  useEffect(() => {
    const savedLayouts = localStorage.getItem('widget-layouts');
    if (savedLayouts) {
      setLayouts(JSON.parse(savedLayouts));
    }

    const savedWidgets = localStorage.getItem('widget-settings');
    if (savedWidgets) {
      const settings = JSON.parse(savedWidgets);
      setWidgets(widgets.map(w => ({
        ...w,
        enabled: settings[w.id] !== false
      })));
    }
  }, []);
  const handleLayoutChange = (layout, layouts) => {
    setLayouts(layouts);
    localStorage.setItem('widget-layouts', JSON.stringify(layouts));
  };

  const toggleWidget = (widgetId) => {
    const newWidgets = widgets.map(w => 
      w.id === widgetId ? { ...w, enabled: !w.enabled } : w
    );
    setWidgets(newWidgets);
    
    const settings = {};
    newWidgets.forEach(w => {
      settings[w.id] = w.enabled;
    });
    localStorage.setItem('widget-settings', JSON.stringify(settings));
  };

  const removeWidget = (widgetId) => {
    toggleWidget(widgetId);
  };

  const enabledWidgets = widgets.filter(w => w.enabled);

  return (
    <div className="relative min-h-screen p-4">
      {/* Settings Button */}
      <motion.button
        className="fixed top-20 right-4 z-40 p-3 bg-gray-900/80 backdrop-blur-xl rounded-lg border border-gray-700/30 hover:bg-gray-800/80 transition-colors"
        onClick={() => setShowSettings(!showSettings)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings size={20} className="text-white" />
      </motion.button>

      {/* Edit Mode Toggle */}
      <motion.button
        className="fixed top-36 right-4 z-40 p-3 bg-gray-900/80 backdrop-blur-xl rounded-lg border border-gray-700/30 hover:bg-gray-800/80 transition-colors"
        onClick={() => setEditMode(!editMode)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Grid3X3 size={20} className={editMode ? 'text-accent-cyan' : 'text-white'} />
      </motion.button>

      {/* Widget Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            className="fixed top-20 right-20 z-50 w-80 bg-gray-900/95 backdrop-blur-xl rounded-lg border border-gray-700/30 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
          >            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Widget Settings</h3>
              <div className="space-y-2">
                {widgets.map(widget => (
                  <div key={widget.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/50">
                    <span className="text-sm text-gray-300 capitalize">
                      {widget.id.replace('-', ' ')}
                    </span>
                    <button
                      onClick={() => toggleWidget(widget.id)}
                      className={`w-12 h-6 rounded-full transition-colors relative ${
                        widget.enabled ? 'bg-accent-cyan' : 'bg-gray-700'
                      }`}
                    >
                      <motion.div
                        className="absolute top-1 w-4 h-4 bg-white rounded-full"
                        animate={{ left: widget.enabled ? '28px' : '4px' }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700/30">
                <p className="text-xs text-gray-400">
                  {editMode ? 'Drag widgets to rearrange' : 'Enable edit mode to rearrange widgets'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget Grid */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 12, sm: 12 }}
        rowHeight={60}
        isDraggable={editMode}
        isResizable={editMode}
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {enabledWidgets.map(widget => {
          const WidgetComponent = widget.component;
          return (
            <div key={widget.id} className={editMode ? 'cursor-move' : ''}>
              <WidgetComponent
                onClose={() => removeWidget(widget.id)}
                onMinimize={() => {}}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>

      {/* Edit Mode Overlay */}
      {editMode && (
        <div className="fixed inset-0 bg-black/20 pointer-events-none z-30">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-lg">
              Edit Mode: Drag and resize widgets
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesktopWidgets;