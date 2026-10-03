--[[
    ========================================================================
    PAINEL PRINCESS - HUB/GUI COMPLETA PARA EXECUTOR (DELTA)
    ========================================================================
    Versão executável via Delta Executor / Fluxus / Hydro.
    Cria a interface "Princess" com abas, status do jogador, ESP/Highlight,
    gerenciamento de inventário local e configurações.
--]]

-- Destruir interface antiga se já existir
if game:GetService("CoreGui"):FindFirstChild("PrincessGui") then
    game:GetService("CoreGui").PrincessGui:Destroy()
end

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local CoreGui = game:GetService("CoreGui")

local LocalPlayer = Players.LocalPlayer

--------------------------------------------------------------------------------
-- 1. CRIAÇÃO DA INTERFACE (SCREEN GUI)
--------------------------------------------------------------------------------
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "PrincessGui"
ScreenGui.ResetOnSpawn = false

-- Proteção para evitar detecção no CoreGui / PlayerGui
if syn and syn.protect_gui then
    syn.protect_gui(ScreenGui)
    ScreenGui.Parent = CoreGui
elseif gethui then
    ScreenGui.Parent = gethui()
else
    ScreenGui.Parent = CoreGui
end

--------------------------------------------------------------------------------
-- 2. ÍCONE FLUTUANTE (ESTRELA PARA MINIMIZAR)
--------------------------------------------------------------------------------
local StarButton = Instance.new("TextButton")
StarButton.Name = "StarIcon"
StarButton.Size = UDim2.new(0, 50, 0, 50)
StarButton.Position = UDim2.new(0.05, 0, 0.2, 0)
StarButton.BackgroundColor3 = Color3.fromRGB(30, 15, 45)
StarButton.BorderColor3 = Color3.fromRGB(200, 50, 255)
StarButton.BorderSizePixel = 2
StarButton.Text = "⭐"
StarButton.TextSize = 25
StarButton.Visible = false
StarButton.Active = true
StarButton.Draggable = true
StarButton.Parent = ScreenGui

local StarUICorner = Instance.new("UICorner")
StarUICorner.CornerRadius = UDim.new(1, 0)
StarUICorner.Parent = StarButton

--------------------------------------------------------------------------------
-- 3. PAINEL PRINCIPAL (PRINCESS PANEL)
--------------------------------------------------------------------------------
local MainFrame = Instance.new("Frame")
MainFrame.Name = "MainFrame"
MainFrame.Size = UDim2.new(0, 540, 0, 350)
MainFrame.Position = UDim2.new(0.5, -270, 0.5, -175)
MainFrame.BackgroundColor3 = Color3.fromRGB(20, 12, 28)
MainFrame.BorderColor3 = Color3.fromRGB(160, 32, 240)
MainFrame.BorderSizePixel = 2
MainFrame.Active = true
MainFrame.Draggable = true
MainFrame.Parent = ScreenGui

local MainUICorner = Instance.new("UICorner")
MainUICorner.CornerRadius = UDim.new(0, 10)
MainUICorner.Parent = MainFrame

-- BARRA DE TÍTULO
local TitleBar = Instance.new("Frame")
TitleBar.Name = "TitleBar"
TitleBar.Size = UDim2.new(1, 0, 0, 40)
TitleBar.BackgroundColor3 = Color3.fromRGB(35, 18, 50)
TitleBar.Parent = MainFrame

local TitleCorner = Instance.new("UICorner")
TitleCorner.CornerRadius = UDim.new(0, 10)
TitleCorner.Parent = TitleBar

local TitleLabel = Instance.new("TextLabel")
TitleLabel.Size = UDim2.new(0.6, 0, 1, 0)
TitleLabel.Position = UDim2.new(0, 15, 0, 0)
TitleLabel.BackgroundTransparency = 1
TitleLabel.Text = "✨ PRINCESS PANEL ✨"
TitleLabel.TextColor3 = Color3.fromRGB(230, 130, 255)
TitleLabel.TextXAlignment = Enum.TextXAlignment.Left
TitleLabel.Font = Enum.Font.GothamBold
TitleLabel.TextSize = 16
TitleLabel.Parent = TitleBar

-- BOTÕES DE FECHAR E MINIMIZAR
local CloseBtn = Instance.new("TextButton")
CloseBtn.Size = UDim2.new(0, 30, 0, 30)
CloseBtn.Position = UDim2.new(1, -35, 0, 5)
CloseBtn.BackgroundColor3 = Color3.fromRGB(180, 40, 60)
CloseBtn.Text = "X"
CloseBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
CloseBtn.Font = Enum.Font.GothamBold
CloseBtn.Parent = TitleBar

local CloseCorner = Instance.new("UICorner")
CloseCorner.CornerRadius = UDim.new(0, 6)
CloseCorner.Parent = CloseBtn

local MinimizeBtn = Instance.new("TextButton")
MinimizeBtn.Size = UDim2.new(0, 30, 0, 30)
O script deve ser executado pelo **Delta Executor** diretamente dentro do jogo (em tempo de execução/Mobile), portanto a estrutura precisa ser adaptada para um **LocalScript completo do lado do cliente**. O Delta não roda scripts de servidor (`ServerScriptService`), então toda a interface gráfica e o painel "Princess" serão criados e manipulados dinamicamente no cliente via `CoreGui` (ou `PlayerGui`).

### Como executar no Delta:
1. Abra o **Roblox** pelo celular com o **Delta Executor** ativo.
2. Entre em qualquer mapa (ou no seu próprio jogo).
3. Abra a janela do Delta, cole todo o código abaixo no editor e aperte **Execute / Run**.

```lua
--[[
    ========================================================================
    PAINEL PRINCESS - EXECUTOR GUI (DELTA EXECUTOR / MOBILE / PC)
    ========================================================================
    Este script cria a interface gráfica "Princess" diretamente no cliente.
    Possui suporte a minimização em ícone de estrela ⭐, abas organizadas,
    lista de jogadores em tempo real com distância, aba de inventário e 
    configurações.
--]]

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local CoreGui = game:GetService("CoreGui")

local LocalPlayer = Players.LocalPlayer

-- Proteção para evitar duplicação de interface ao reexecutar
if CoreGui:FindFirstChild("PrincessGui") then
    CoreGui.PrincessGui:Destroy()
end
if LocalPlayer:WaitForChild("PlayerGui"):FindFirstChild("PrincessGui") then
    LocalPlayer.PlayerGui.PrincessGui:Destroy()
end

-- Tenta inserir no CoreGui (padrão de executores); se falhar, insere no PlayerGui
local TargetParent = CoreGui
local success = pcall(function()
    local test = Instance.new("Folder")
    test.Parent = CoreGui
    test:Destroy()
end)
if not success then
    TargetParent = LocalPlayer:WaitForChild("PlayerGui")
end

--------------------------------------------------------------------------------
-- 1. CRIAÇÃO DA ESTRUTURA PRINCIPAL
--------------------------------------------------------------------------------
local ScreenGui = Instance.new("ScreenGui")
ScreenGui.Name = "PrincessGui"
ScreenGui.ResetOnSpawn = false
ScreenGui.Parent = TargetParent

-- Ícone Flutuante (Estrela ao Minimizar)
local StarButton = Instance.new("TextButton")
StarButton.Name = "StarIcon"
StarButton.Size = UDim2.new(0, 50, 0, 50)
StarButton.Position = UDim2.new(0.05, 0, 0.2, 0)
StarButton.BackgroundColor3 = Color3.fromRGB(35, 15, 50)
StarButton.BorderColor3 = Color3.fromRGB(200, 50, 255)
StarButton.BorderSizePixel = 2
StarButton.Text = "⭐"
StarButton.TextSize = 25
StarButton.Visible = false
StarButton.Active = true
StarButton.Draggable = true
StarButton.Parent = ScreenGui

local StarUICorner = Instance.new("UICorner")
StarUICorner.CornerRadius = UDim.new(1, 0)
StarUICorner.Parent = StarButton

-- Painel Principal (Princess)
local MainFrame = Instance.new("Frame")
MainFrame.Name = "MainFrame"
MainFrame.Size = UDim2.new(0, 520, 0, 320)
MainFrame.Position = UDim2.new(0.5, -260, 0.5, -160)
MainFrame.BackgroundColor3 = Color3.fromRGB(20, 12, 28)
MainFrame.BorderColor3 = Color3.fromRGB(160, 32, 240)
MainFrame.BorderSizePixel = 2
MainFrame.Active = true
MainFrame.Draggable = true
MainFrame.Parent = ScreenGui

local MainUICorner = Instance.new("UICorner")
MainUICorner.CornerRadius = UDim.new(0, 10)
MainUICorner.Parent = MainFrame

-- Barra Superior
local TitleBar = Instance.new("Frame")
TitleBar.Name = "TitleBar"
TitleBar.Size = UDim2.new(1, 0, 0, 35)
TitleBar.BackgroundColor3 = Color3.fromRGB(35, 18, 50)
TitleBar.Parent = MainFrame

local TitleCorner = Instance.new("UICorner")
TitleCorner.CornerRadius = UDim.new(0, 10)
TitleCorner.Parent = TitleBar

local TitleLabel = Instance.new("TextLabel")
TitleLabel.Size = UDim2.new(0.6, 0, 1, 0)
TitleLabel.Position = UDim2.new(0, 12, 0, 0)
TitleLabel.BackgroundTransparency = 1
TitleLabel.Text = "✨ PRINCESS PANEL ✨"
TitleLabel.TextColor3 = Color3.fromRGB(230, 130, 255)
TitleLabel.TextXAlignment = Enum.TextXAlignment.Left
TitleLabel.Font = Enum.Font.GothamBold
TitleLabel.TextSize = 14
TitleLabel.Parent = TitleBar

-- Botões Fechar e Minimizar
local CloseBtn = Instance.new("TextButton")
CloseBtn.Size = UDim2.new(0, 25, 0, 25)
CloseBtn.Position = UDim2.new(1, -30, 0, 5)
CloseBtn.BackgroundColor3 = Color3.fromRGB(180, 40, 60)
CloseBtn.Text = "X"
CloseBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
CloseBtn.Font = Enum.Font.GothamBold
CloseBtn.Parent = TitleBar

local CloseCorner = Instance.new("UICorner")
CloseCorner.CornerRadius = UDim.new(0, 5)
CloseCorner.Parent = CloseBtn

local MinimizeBtn = Instance.new("TextButton")
MinimizeBtn.Size = UDim2.new(0, 25, 0, 25)
MinimizeBtn.Position = UDim2.new(1, -60, 0, 5)
MinimizeBtn.BackgroundColor3 = Color3.fromRGB(80, 50, 110)
MinimizeBtn.Text = "-"
MinimizeBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
MinimizeBtn.Font = Enum.Font.GothamBold
MinimizeBtn.Parent = TitleBar

local MinCorner = Instance.new("UICorner")
MinCorner.CornerRadius = UDim.new(0, 5)
MinCorner.Parent = MinimizeBtn

--------------------------------------------------------------------------------
-- 2. NAVEGAÇÃO E ABAS
--------------------------------------------------------------------------------
local TabBar = Instance.new("Frame")
TabBar.Size = UDim2.new(0, 120, 1, -45)
TabBar.Position = UDim2.new(0, 5, 0, 40)
TabBar.BackgroundColor3 = Color3.fromRGB(28, 15, 40)
TabBar.Parent = MainFrame

local TabCorner = Instance.new("UICorner")
TabCorner.CornerRadius = UDim.new(0, 8)
TabCorner.Parent = TabBar

local TabList = Instance.new("UIListLayout")
TabList.Padding = UDim.new(0, 4)
TabList.Parent = TabBar

local ContentContainer = Instance.new("Frame")
ContentContainer.Size = UDim2.new(1, -135, 1, -45)
ContentContainer.Position = UDim2.new(0, 130, 0, 40)
ContentContainer.BackgroundTransparency = 1
ContentContainer.Parent = MainFrame

local Tabs = {}
local TabNames = {
    {Id = "Home", Name = "🏠 Home"},
    {Id = "Players", Name = "👁 Players"},
    {Id = "Weapons", Name = "🔪 Weapons"},
    {Id = "Inventory", Name = "🎒 Inventory"},
    {Id = "Trade", Name = "🔄 Trade"},
    {Id = "Settings", Name = "⚙️ Settings"}
}

local function SwitchTab(tabId)
    for id, frame in pairs(Tabs) do
        frame.Visible = (id == tabId)
    end
end

for _, tabData in ipairs(TabNames) do
    local btn = Instance.new("TextButton")
    btn.Size = UDim2.new(1, 0, 0, 38)
    btn.BackgroundColor3 = Color3.fromRGB(45, 25, 65)
    btn.Text = tabData.Name
    btn.TextColor3 = Color3.fromRGB(220, 200, 240)
    btn.Font = Enum.Font.GothamSemibold
    btn.TextSize = 12
    btn.Parent = TabBar

    local btnCorner = Instance.new("UICorner")
    btnCorner.CornerRadius = UDim.new(0, 5)
    btnCorner.Parent = btn

    local frame = Instance.new("Frame")
    frame.Size = UDim2.new(1, 0, 1, 0)
    frame.BackgroundTransparency = 1
    frame.Visible = false
    frame.Parent = ContentContainer

    Tabs[tabData.Id] = frame

    btn.MouseButton1Click:Connect(function()
        SwitchTab(tabData.Id)
    end)
end

SwitchTab("Home")

--------------------------------------------------------------------------------
-- 3. CONTEÚDO DAS ABAS
--------------------------------------------------------------------------------
-- ABA HOME
local HomeText = Instance.new("TextLabel")
HomeText.Size = UDim2.new(1, -10, 1, -10)
HomeText.Position = UDim2.new(0, 5, 0, 5)
HomeText.BackgroundTransparency = 1
HomeText.TextColor3 = Color3.fromRGB(240, 230, 255)
HomeText.Font = Enum.Font.Gotham
HomeText.TextSize = 13
HomeText.TextYAlignment = Enum.TextYAlignment.Top
HomeText.TextXAlignment = Enum.TextXAlignment.Left
HomeText.Parent = Tabs.Home

HomeText.Text = string.format(
    "Bem-vindo(a), %s!\n\nStatus da Sessão: Ativo\nPlataforma: %s\nStatus do Script: Carregado com sucesso via Delta.",
    LocalPlayer.DisplayName,
    UserInputService:GetPlatform() == Enum.Platform.Android and "Mobile (Android)" or "PC/Outro"
)

-- ABA PLAYERS
local PlayersScroll = Instance.new("ScrollingFrame")
PlayersScroll.Size = UDim2.new(1, 0, 1, 0)
PlayersScroll.BackgroundTransparency = 1
PlayersScroll.CanvasSize = UDim2.new(0, 0, 0, 0)
PlayersScroll.AutomaticCanvasSize = Enum.AutomaticSize.Y
PlayersScroll.Parent = Tabs.Players

local PlayersLayout = Instance.new("UIListLayout")
PlayersLayout.Padding = UDim.new(0, 4)
PlayersLayout.Parent = PlayersScroll

-- ABA WEAPONS & INVENTORY
local WeaponsLabel = Instance.new("TextLabel")
WeaponsLabel.Size = UDim2.new(1, 0, 0, 30)
WeaponsLabel.BackgroundTransparency = 1
WeaponsLabel.Text = "Gerenciador de Armas e Skins"
WeaponsLabel.TextColor3 = Color3.fromRGB(230, 150, 255)
WeaponsLabel.Font = Enum.Font.GothamBold
WeaponsLabel.TextSize = 14
WeaponsLabel.Parent = Tabs.Weapons

local InvLabel = Instance.new("TextLabel")
InvLabel.Size = UDim2.new(1, 0, 0, 30)
InvLabel.BackgroundTransparency = 1
InvLabel.Text = "Inventário de Itens"
InvLabel.TextColor3 = Color3.fromRGB(230, 150, 255)
InvLabel.Font = Enum.Font.GothamBold
InvLabel.TextSize = 14
InvLabel.Parent = Tabs.Inventory

-- ABA TRADE
local TradeLabel = Instance.new("TextLabel")
TradeLabel.Size = UDim2.new(1, 0, 0, 30)
TradeLabel.BackgroundTransparency = 1
TradeLabel.Text = "Sistema de Troca (Aguardando Jogadores)"
TradeLabel.TextColor3 = Color3.fromRGB(200, 200, 200)
TradeLabel.Font = Enum.Font.Gotham
TradeLabel.TextSize = 12
TradeLabel.Parent = Tabs.Trade

-- ABA SETTINGS
local ResetBtn = Instance.new("TextButton")
ResetBtn.Size = UDim2.new(0, 220, 0, 35)
ResetBtn.Position = UDim2.new(0, 5, 0, 5)
ResetBtn.BackgroundColor3 = Color3.fromRGB(160, 40, 50)
ResetBtn.Text = "Restaurar Configurações"
ResetBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
ResetBtn.Font = Enum.Font.GothamBold
ResetBtn.TextSize = 12
ResetBtn.Parent = Tabs.Settings

local ResetCorner = Instance.new("UICorner")
ResetCorner.CornerRadius = UDim.new(0, 6)
ResetCorner.Parent = ResetBtn

--------------------------------------------------------------------------------
-- 4. ANIMAÇÕES E LÓGICA DE MINIMIZAR / FECHAR
--------------------------------------------------------------------------------
local function AnimateOpen()
    MainFrame.Visible = true
    MainFrame.Size = UDim2.new(0, 0, 0, 0)
    MainFrame.Position = UDim2.new(0.5, 0, 0.5, 0)
    TweenService:Create(MainFrame, TweenInfo.new(0.3, Enum.EasingStyle.Back, Enum.EasingDirection.Out), {
        Size = UDim2.new(0, 520, 0, 320),
        Position = UDim2.new(0.5, -260, 0.5, -160)
    }):Play()
end

MinimizeBtn.MouseButton1Click:Connect(function()
    TweenService:Create(MainFrame, TweenInfo.new(0.2, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {
        Size = UDim2.new(0, 0, 0, 0),
        Position = UDim2.new(0.05, 25, 0.2, 25)
    }):Play()
    task.wait(0.2)
    MainFrame.Visible = false
    StarButton.Visible = true
end)

StarButton.MouseButton1Click:Connect(function()
    StarButton.Visible = false
    AnimateOpen()
end)

CloseBtn.MouseButton1Click:Connect(function()
    TweenService:Create(MainFrame, TweenInfo.new(0.2, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {
        Size = UDim2.new(0, 0, 0, 0)
    }):Play()
    task.wait(0.2)
    ScreenGui:Destroy()
end)

--------------------------------------------------------------------------------
-- 5. ATUALIZAÇÃO DA LISTA DE JOGADORES EM TEMPO REAL
--------------------------------------------------------------------------------
local lastUpdate = 0
RunService.RenderStepped:Connect(function()
    local now = os.clock()
    if now - lastUpdate < 0.5 then return end -- Limita atualização a cada 0.5s
    lastUpdate = now

    if Tabs.Players.Visible then
        for _, child in ipairs(PlayersScroll:GetChildren()) do
            if child:IsA("Frame") then
                child:Destroy()
            end
        end

        for _, p in ipairs(Players:GetPlayers()) do
            if p ~= LocalPlayer then
                local dist = 0
                if p.Character and p.Character:FindFirstChild("HumanoidRootPart") and LocalPlayer.Character and LocalPlayer.Character:FindFirstChild("HumanoidRootPart") then
                    dist = (p.Character.HumanoidRootPart.Position - LocalPlayer.Character.HumanoidRootPart.Position).Magnitude
                end

                local pFrame = Instance.new("Frame")
                pFrame.Size = UDim2.new(1, -10, 0, 28)
                pFrame.BackgroundColor3 = Color3.fromRGB(40, 22, 55)
                pFrame.Parent = PlayersScroll

                local pCorner = Instance.new("UICorner")
                pCorner.CornerRadius = UDim.new(0, 4)
                pCorner.Parent = pFrame

                local pTxt = Instance.new("TextLabel")
                pTxt.Size = UDim2.new(1, -10, 1, 0)
                pTxt.Position = UDim2.new(0, 5, 0, 0)
                pTxt.BackgroundTransparency = 1
                pTxt.Text = string.format("👤 %s | Distância: %.1fm", p.DisplayName, dist)
                pTxt.TextColor3 = Color3.fromRGB(230, 220, 255)
                pTxt.TextXAlignment = Enum.TextXAlignment.Left
                pTxt.Font = Enum.Font.Gotham
                pTxt.TextSize = 11
                pTxt.Parent = pFrame
            end
        end
    end
end)
        
