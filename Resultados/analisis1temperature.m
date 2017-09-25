clear all
close all
clc

filename = 'Result_1_temperature.dat';
M = csvread(filename);

waterLevel = M(:,1);
temperature = M(:,2);
pH = M(:,3);

alarmStatus = M(:,4:9);

actuatorStatus = M(:,10:15);

pumpIn = actuatorStatus(:,1);
pumpOut = actuatorStatus(:,2);
heater = actuatorStatus(:,3);
CO2 = actuatorStatus(:,6);

%figure('units','normalized','outerposition',[0 0 1 1])
figure

plot(temperature/10,'Marker','o','Color','black', 'LineWidth', 2);

axis tight

%title({'Ensayo de Control de Alarma'; 'Temperatura'; ' '},'FontName', 'Arial','FontSize', 24);

xlabel('Número de adquisición', 'FontName', 'Arial','FontSize', 18);
ylabel('Temperatura', 'FontName', 'Arial','FontSize', 18);

set(gcf,'units','normalized','outerposition',[0 0 1 1])
hold on
grid on
grid minor

stairs(2*pumpIn,'LineWidth',1.5,'Marker','o','Color','g');
stairs(2*pumpOut+3,'LineWidth',1.5,'Marker','o','Color','b');
stairs(2*heater+6,'LineWidth',1.5,'Marker','o','Color','r')
stairs(2*CO2+9,'LineWidth',1.5,'Marker','o','Color','m');

plot(xlim,[21 21],'--','Color','r');
plot(xlim,[17 17],'--','Color','b');

h_legend = legend('Temperatura', 'Bomba de Entrada', 'Bomba de Salida', 'Calefactor',...
    'Bomba de CO2', 'Umbral alto','Umbral bajo','Location','northeastoutside');

set(h_legend,'FontSize',14);

set(gcf, 'PaperPositionMode', 'manual');
set(gcf, 'PaperUnits', 'inches');
set(gcf, 'PaperPosition', [2.5 2.5 20 10]); % last 2 are width/height.

print('plotTemp','-depsc2')
hold off
