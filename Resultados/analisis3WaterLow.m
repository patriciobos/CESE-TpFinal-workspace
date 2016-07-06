clear all
close all
clc

filename = 'Result_3_WaterLow.dat';
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

h1 = plot(waterLevel/10,'Marker','o','Color','black', 'LineWidth', 2);
hold on
h2 = plot(temperature/10,'Marker','o','Color',[0 .75 .75], 'LineWidth', 2);
h3 = plot(pH/10,'Marker','o','Color',[.75 .5 0], 'LineWidth', 2);

axis tight
xlabel('Número de adquisición', 'FontName', 'Arial','FontSize', 18);

set(gcf,'units','normalized','outerposition',[0 0 1 1])

grid on
grid minor

h4 = stairs(pumpIn-1.5,'LineWidth',1.5,'Marker','o','Color','g');
h5 = stairs(pumpOut,'LineWidth',1.5,'Marker','o','Color','b');
h6 = stairs(heater+1.5,'LineWidth',1.5,'Marker','o','Color','r');
h7 = stairs(CO2+3,'LineWidth',1.5,'Marker','o','Color','m');

h8 = plot(xlim,[15 15],'--','Color','black');
plot(xlim,[5 5],'--','Color','black');

h9 = plot(xlim,[21 21],'--','Color',[0 .75 .75]);
plot(xlim,[17 17],'--','Color',[0 .75 .75]);

h10 = plot(xlim,[7.5 7.5],'--','Color',[.75 .5 0]);
plot(xlim,[6.5 6.5],'--','Color',[.75 .5 0]);

h_legend = legend([h1 h2 h3 h4 h5 h6 h7 h8 h9 h10],{'Nivel de Agua',...
    'Temperatura','pH', 'Bomba de Entrada', 'Bomba de Salida', ...
    'Calentador','Bomba de CO2','Umbrales Nivel de Agua', ...
    'Umbrales Temperatura','Umbrales pH'},'Location','northeastoutside');

set(h_legend,'FontSize',14);

set(gcf, 'PaperPositionMode', 'manual');
set(gcf, 'PaperUnits', 'inches');
set(gcf, 'PaperPosition', [2.5 2.5 20 10]); % last 2 are width/height.

print('plot3waterLow','-depsc2')
hold off
