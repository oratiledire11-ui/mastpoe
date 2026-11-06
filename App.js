import React, { useEffect, useMemo, useState } from "react";
import { BackHandler } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import MenuScreen from "./src/screens/MenuScreen";
import DishFormScreen from "./src/screens/DishFormScreen";
import StatsScreen from "./src/screens/StatsScreen";
import { INITIAL_MENU } from "./src/constants";
import { getStats } from "./src/utils";

export default function App() {
  const [screen, setScreen] = useState("home"); // home | menu | add | edit | stats
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [editingId, setEditingId] = useState(null);
  const [editHint, setEditHint] = useState(false);

  // Statistics are derived from the menu, so they update instantly after add / edit / delete.
  const stats = useMemo(() => getStats(menu), [menu]);
  const editingDish = menu.find((item) => item.id === editingId);

  const goHome = () => setScreen("home");
  const openMenu = (hint = false) => {
    setEditHint(hint);
    setScreen("menu");
  };
  const openEdit = (dish) => {
    setEditingId(dish.id);
    setScreen("edit");
  };

  const addDish = (data) => {
    setMenu((current) => [...current, { id: Date.now().toString(), ...data }]);
    openMenu();
  };

  const updateDish = (data) => {
    setMenu((current) => current.map((item) => (item.id === editingId ? { ...item, ...data } : item)));
    setEditingId(null);
    openMenu();
  };

  const deleteDish = (id) => setMenu((current) => current.filter((item) => item.id !== id));

  // Android hardware back button
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (screen === "home") return false;
      if (screen === "edit") {
        setEditingId(null);
        setScreen("menu");
      } else {
        setScreen("home");
      }
      return true;
    });
    return () => sub.remove();
  }, [screen]);

  switch (screen) {
    case "menu":
      return (
        <MenuScreen
          menu={menu}
          editHint={editHint}
          onBack={goHome}
          onAdd={() => setScreen("add")}
          onEdit={openEdit}
          onDelete={deleteDish}
        />
      );
    case "add":
      return <DishFormScreen onSave={addDish} onCancel={goHome} />;
    case "edit":
      if (!editingDish) return null;
      return (
        <DishFormScreen
          key={editingDish.id}
          dish={editingDish}
          onSave={updateDish}
          onCancel={() => {
            setEditingId(null);
            setScreen("menu");
          }}
        />
      );
    case "stats":
      return <StatsScreen stats={stats} onBack={goHome} />;
    default:
      return (
        <HomeScreen
          stats={stats}
          onAdd={() => setScreen("add")}
          onViewMenu={() => openMenu(false)}
          onUpdate={() => openMenu(true)}
          onStats={() => setScreen("stats")}
        />
      );
  }
}
