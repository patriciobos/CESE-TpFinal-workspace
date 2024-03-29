clear all
close all
clc

filename = 'Result_1_waterLevel.dat';
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

%--------------------------------------------------------
plot(waterLevel/10,'Marker','o','Color','black', 'LineWidth', 2);

axis tight

% title({'Ensayo de Control de Alarma'; 'Nivel de Agua'; ' '},'FontName', 'Arial','FontSize', 24);

xlabel('Número de adquisición', 'FontName', 'Arial','FontSize', 18);
ylabel('Nivel de agua', 'FontName', 'Arial','FontSize', 18);

set(gcf,'units','normalized','outerposition',[0 0 1 1])
hold on
grid on
grid minor

stairs(pumpIn-1.5,'LineWidth',1.5,'Marker','o','Color','g');
stairs(pumpOut,'LineWidth',1.5,'Marker','o','Color','b');
stairs(heater+1.5,'LineWidth',1.5,'Marker','o','Color','r')
stairs(CO2+3,'LineWidth',1.5,'Marker','o','Color','m');

plot(xlim,[15 15],'--','Color','r');
plot(xlim,[5 5],'--','Color','b');

h_legend = legend('Nivel de Agua', 'Bomba de Entrada', 'Bomba de Salida', 'Calefactor',...
    'Bomba de CO2', 'Umbral alto','Umbral bajo','Location','northeastoutside');

set(h_legend,'FontSize',14);


set(gcf, 'PaperPositionMode', 'manual');
set(gcf, 'PaperUnits', 'inches');
set(gcf, 'PaperPosition', [2.5 2.5 20 10]); % last 2 are width/height.

print('plotWater','-depsc2')
hold off

%--------------------------------------------------------------

